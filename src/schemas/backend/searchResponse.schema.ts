import { z } from "zod";

/**
 * HATEOAS link structure
 * Represents a hypermedia link to a related resource
 */
export const LinkSchema = z.object({
  href: z.string().describe("URL of the linked resource"),
});

/**
 * Links object for HATEOAS compliance
 * Contains hypermedia links to related resources
 */
export const LinksSchema = z.object({
  self: LinkSchema.optional(),
  postcode: LinkSchema.optional(),
  alternate: LinkSchema.optional(),
});

export const PostcodeResponseSchema = z.object({
  _id: z.string().describe("MongoDB ObjectId of the postcode"),
  postcode: z.string().describe("UK postcode in normalized format"),
  eastings: z
    .number()
    .optional()
    .describe("Ordnance Survey Easting coordinate"),
  northings: z
    .number()
    .optional()
    .describe("Ordnance Survey Northing coordinate"),
  country: z
    .string()
    .describe("Country name (England, Scotland, Wales, Northern Ireland)"),
  longitude: z.number().describe("Longitude coordinate in WGS84 format"),
  latitude: z.number().describe("Latitude coordinate in WGS84 format"),
  region: z.string().optional().describe("Region name"),
  parliamentary_constituency: z
    .string()
    .optional()
    .describe("Parliamentary constituency name"),
  admin_district: z
    .string()
    .optional()
    .describe("Administrative district name"),
  admin_ward: z.string().optional().describe("Administrative ward name"),
  parish: z.string().optional().describe("Parish name"),
  admin_county: z
    .string()
    .nullable()
    .describe("Administrative county name (can be null)"),
  __v: z.number().optional().describe("Mongoose version key"),
});

export const BusStopResponseSchema = z.object({
  _id: z.string().describe("MongoDB ObjectId of the bus stop"),
  ATCO_long: z.string().describe("Long ATCO code identifier"),
  ATCO_short: z.string().optional().describe("Short ATCO code identifier"),
  CommonName: z.string().optional().describe("Common name of the bus stop"),
  Street: z
    .string()
    .optional()
    .describe("Street name where the bus stop is located"),
  Longitude: z.string().optional().describe("Longitude coordinate as string"),
  Latitude: z.string().optional().describe("Latitude coordinate as string"),
  Northing: z.string().describe("British National Grid Northing coordinate"),
  Easting: z.string().describe("British National Grid Easting coordinate"),
  __v: z.number().optional().describe("Mongoose version key"),
});

export const CrimeResponseSchema = z.object({
  _id: z.string().describe("MongoDB ObjectId of the crime record"),
  crimeID: z.number().optional().describe("Unique crime identifier"),
  latitude: z.number().describe("Latitude coordinate of the crime location"),
  longitude: z.number().describe("Longitude coordinate of the crime location"),
  crime_category: z
    .string()
    .optional()
    .describe("Category of the crime (e.g., anti-social-behaviour)"),
  crime_date: z
    .string()
    .optional()
    .describe("Date of the crime in YYYY-MM format"),
  outcome_category: z
    .string()
    .optional()
    .describe("Outcome category of the crime"),
  outcome_date: z.string().optional().describe("Date of the crime outcome"),
  __v: z.number().optional().describe("Mongoose version key"),
});

/**
 * Main /search API response schema
 * Aggregates postcode, bus stop, and crime data for a location
 *
 * Edge cases handled:
 * - Optional MongoDB reference fields (linkedATCO, linkedCrimeList)
 * - Optional HATEOAS links
 * - Arrays with nested object validation (queryBusStops, queryCrimes)
 */
export const SearchAPIResponseSchema = z.object({
  _id: z.string().describe("MongoDB ObjectId of the search record"),
  searchID: z.number().describe("Unique sequential search identifier"),
  latitude: z.number().describe("Latitude coordinate in WGS84 format"),
  longitude: z.number().describe("Longitude coordinate in WGS84 format"),
  Northing: z.string().describe("British National Grid Northing coordinate"),
  Easting: z.string().describe("British National Grid Easting coordinate"),
  reverseLookup: z
    .boolean()
    .describe("Whether this search was performed via reverse geocoding"),
  Postcode: PostcodeResponseSchema,
  queryBusStops: z
    .array(BusStopResponseSchema)
    .describe("Array of nearby bus stops (up to 5)"),
  queryCrimes: z
    .array(CrimeResponseSchema)
    .describe("Array of crimes in the area"),
  linkedATCO: z
    .string()
    .optional()
    .describe(
      "MongoDB ObjectId reference to the linked ATCO code (not populated)"
    ),
  linkedCrimeList: z
    .string()
    .optional()
    .describe(
      "MongoDB ObjectId reference to the linked CrimeList (not populated)"
    ),
  _links: LinksSchema.optional(),
  __v: z.number().optional().describe("Mongoose version key"),
});

export type SearchAPIResponse = z.infer<typeof SearchAPIResponseSchema>;
