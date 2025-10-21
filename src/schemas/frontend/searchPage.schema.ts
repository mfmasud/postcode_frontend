import { z } from "zod";
import {
  PostcodeResponseSchema,
  BusStopResponseSchema,
  CrimeResponseSchema,
} from "@/schemas/backend/searchResponse.schema";

export const FrontendPostcodeSchema = PostcodeResponseSchema.omit({
  _id: true,
  __v: true,
});

export const FrontendBusStopSchema = BusStopResponseSchema.omit({
  _id: true,
  __v: true,
});

export const FrontendCrimeSchema = CrimeResponseSchema.omit({
  _id: true,
  __v: true,
});

/**
 * Search metadata schema
 * Contains search context and location information
 */
export const SearchMetadataSchema = z.object({
  searchID: z.number().describe("Unique sequential search identifier"),
  latitude: z.number().describe("Latitude coordinate in WGS84 format"),
  longitude: z.number().describe("Longitude coordinate in WGS84 format"),
  Northing: z.string().describe("British National Grid Northing coordinate"),
  Easting: z.string().describe("British National Grid Easting coordinate"),
  reverseLookup: z
    .boolean()
    .describe("Whether this search was performed via reverse geocoding"),
  postcode: FrontendPostcodeSchema.describe(
    "Postcode details for the search location"
  ),
});

/**
 * Organized frontend search response schema
 * Restructures backend response into three logical sections
 *
 * Structure:
 * 1. metadata - Search context and location information
 * 2. queryBusStops - Array of nearby bus stops
 * 3. queryCrimes - Array of crimes in the area
 */
export const SearchResponseSchema = z.object({
  metadata: SearchMetadataSchema.describe(
    "Search context and location information"
  ),
  queryBusStops: z
    .array(FrontendBusStopSchema)
    .describe("Array of nearby bus stops (up to 5)"),
  queryCrimes: z
    .array(FrontendCrimeSchema)
    .describe("Array of crimes in the area"),
});

export type SearchMetadata = z.infer<typeof SearchMetadataSchema>;
export type FrontendPostcode = z.infer<typeof FrontendPostcodeSchema>;
export type FrontendBusStop = z.infer<typeof FrontendBusStopSchema>;
export type FrontendCrime = z.infer<typeof FrontendCrimeSchema>;
export type SearchResponse = z.infer<typeof SearchResponseSchema>;
