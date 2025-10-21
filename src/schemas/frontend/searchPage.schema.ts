import { z } from "zod";
import {
  PostcodeResponseSchema,
  BusStopResponseSchema,
  CrimeResponseSchema,
  SearchAPIResponseSchema,
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
 *
 * Based on SearchAPIResponseSchema, except postcode (uses frontend schema instead)
 */
export const SearchMetadataSchema = SearchAPIResponseSchema.pick({
  searchID: true,
  latitude: true,
  longitude: true,
  Northing: true,
  Easting: true,
  reverseLookup: true,
}).extend({
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
    .describe("Array of nearby bus stops"),
  queryCrimes: z
    .array(FrontendCrimeSchema)
    .describe("Array of crimes in the area"),
});

export type SearchMetadata = z.infer<typeof SearchMetadataSchema>;
export type FrontendPostcode = z.infer<typeof FrontendPostcodeSchema>;
export type FrontendBusStop = z.infer<typeof FrontendBusStopSchema>;
export type FrontendCrime = z.infer<typeof FrontendCrimeSchema>;
export type SearchResponse = z.infer<typeof SearchResponseSchema>;
