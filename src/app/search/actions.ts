"use server";

/*
Backend = process.env.BACKEND_URL
| GET | `/search` | Query: `latitude` (number, -90 to 90),`longitude` (number, -180 to 180) | No Body Param | none | Geospatial search via coordinates |
| POST | `/search` | No Query Param |  Body param: `postcode` (string, UK format) | none | Search via postcode |
*/

const BACKEND_URL = process.env.BACKEND_URL;

import {
  type SearchResponse,
  SearchBodySchema,
  SearchResponseSchema,
  type SearchAPIResponse,
} from "@/schemas/search.schema";
import { validatePostcode } from "@/schemas/request/SearchBody.schema";

// Transform backend API response into the frontend SearchResponse shape
function mapToFrontendSearchResponse(api: SearchAPIResponse): SearchResponse {
  return {
    metadata: {
      searchID: api.searchID,
      latitude: api.latitude,
      longitude: api.longitude,
      Northing: api.Northing,
      Easting: api.Easting,
      reverseLookup: api.reverseLookup,
      Postcode: api.Postcode,
    },
    queryBusStops: api.queryBusStops,
    queryCrimes: api.queryCrimes,
  };
}

/*
// Server Action: for GET-like use inside Server Components
export async function searchByCoordinates(latitude: number, longitude: number) {
  // Obtain the query parameters as function parameters

  // Validate the params
  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    throw new Error("Invalid coordinates");
  }

  // Pass the params to the backend API
  const url = `http://${BACKEND_URL}/search?latitude=${latitude}&longitude=${longitude}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch geospatial data");

  // Return the backend API result
  return res.json();
}
*/

// State type for search results
export type searchByPostcodeState = {
  success: boolean;
  data?: SearchResponse;
  error?: string;
  entered_postcode: string;
};

// Server Action: for POST via form or client action
export async function searchByPostcode(
  _prevState: searchByPostcodeState,
  formData: FormData
): Promise<searchByPostcodeState> {
  // Obtain the postcode from the form data to be used as the request body
  const postcode = formData.get("postcode") as string;

  try {
    // Validate the postcode
    const normalisedPostcode = validatePostcode(postcode);
    const validatedPostcode = SearchBodySchema.safeParse({
      postcode: normalisedPostcode,
    });
    if (!validatedPostcode.success) {
      return {
        success: false,
        error: validatedPostcode.error.message,
        entered_postcode: postcode,
      };
    }

    // Check if the semantically valid postcode is real UK one
    // calls postcodes.io to check
    const validationRes = await fetch(
      `http://${BACKEND_URL}/postcodes/validate`,
      {
        method: "POST",
        body: JSON.stringify({ postcode: normalisedPostcode }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!validationRes.ok) {
      return {
        success: false,
        error:
          "Backend API call failed or the entered postcode is not a real UK postcode",
        entered_postcode: postcode,
      };
    }

    // Pass the postcode as the request body to the backend search API
    const res = await fetch(`http://${BACKEND_URL}/search`, {
      method: "POST",
      body: JSON.stringify({ postcode: normalisedPostcode }),
      headers: { "Content-Type": "application/json" },
    });

    // Return error if the backend API call fails
    if (!res.ok) {
      return {
        success: false,
        error: "Backend API call failed or the entered postcode is not active",
        entered_postcode: postcode,
      };
    }

    // Validate and transform the backend API response to frontend schema
    const data: SearchAPIResponse = (await res.json()) as SearchAPIResponse;
    const transformed = mapToFrontendSearchResponse(data);
    const parsed = SearchResponseSchema.safeParse(transformed);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.message,
        entered_postcode: postcode,
      };
    }
    return {
      success: true,
      data: parsed.data,
      entered_postcode: postcode,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
      entered_postcode: postcode,
    };
  }
}
