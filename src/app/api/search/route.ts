/*
Backend = process.env.BACKEND_URL
| GET | `/search` | Query: `latitude` (number, -90 to 90),`longitude` (number, -180 to 180) | No Body Param | none | Geospatial search via coordinates |
| POST | `/search` | No Query Param |  Body param: `postcode` (string, UK format) | none | Search via postcode |
*/

import type { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function GET(request: NextRequest) {
  // Obtain the query parameters
  const searchParams = request.nextUrl.searchParams;
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");

  // Validate the params

  // Pass the params to the backend API
  const callRoute = `${BACKEND_URL}/?${searchParams.toString()}`;

  // Return the backend API result
  return { latitude, longitude };
}

export async function POST(request: Request) {
  // Parse the request body
  const res = await request.json();
  const { postcode } = res;

  // Validate the postcode

  // Pass the postcode as the request body to the backend API

  // Return the backend API result
  return Response.json({ postcode });
}
