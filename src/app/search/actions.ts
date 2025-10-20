"use server";

/*
Backend = process.env.BACKEND_URL
| GET | `/search` | Query: `latitude` (number, -90 to 90),`longitude` (number, -180 to 180) | No Body Param | none | Geospatial search via coordinates |
| POST | `/search` | No Query Param |  Body param: `postcode` (string, UK format) | none | Search via postcode |
*/

const BACKEND_URL = process.env.BACKEND_URL;

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

// State type for search results
export type SearchState = {
  success: boolean;
  data?: unknown;
  error?: string;
} | null;

// Server Action: for POST via form or client action
export async function searchByPostcode(
  _prevState: SearchState,
  formData: FormData
): Promise<SearchState> {
  try {
    // Obtain the postcode from the form data to be used as the request body
    const postcode = formData.get("postcode") as string;

    // Validate the postcode

    // Pass the postcode as the request body to the backend API
    const res = await fetch(`http://${BACKEND_URL}/search`, {
      method: "POST",
      body: JSON.stringify({ postcode }),
      headers: { "Content-Type": "application/json" },
    });

    // Return the backend API result
    if (!res.ok) {
      return {
        success: false,
        error: "Backend API call failed",
      };
    }

    const data = await res.json();
    //console.log(data);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
