import { z } from "zod";

/**
 * Frontend Schema Definitions for Search API
 *
 * This file contains Zod schemas for runtime validation and TypeScript types
 * for the Search API responses. These schemas are derived from the backend
 * TypeBox schemas maintained by the backend team.
 *
 * @module schemas/search
 */

// ============================================================================
// BACKEND API CONTRACTS (Reference Documentation)
// ============================================================================
// The following TypeBox schemas represent the backend API contracts.
// They are included here as reference documentation to maintain traceability
// between frontend and backend type definitions.
//
// Backend Repository: https://github.com/mfmasud/postcode_stats
//
// NOTE: These are NOT executable code - they serve as documentation only.
// The actual frontend validation uses the Zod schemas below.
// ============================================================================

/*
// HATEOAS link structure
const LinkSchema = Type.Object({
    href: Type.String({
        description: "URL of the linked resource",
    }),
})

// Links object for HATEOAS compliance
const LinksSchema = Type.Object({
    self: Type.Optional(LinkSchema),
    postcode: Type.Optional(LinkSchema),
    alternate: Type.Optional(LinkSchema),
})

// Common postcode return structure
// Based on the Postcode Mongoose model
export const PostcodeResponseSchema = Type.Object({
    _id: Type.String({
        description: "MongoDB ObjectId of the postcode",
    }),
    postcode: Type.String({
        description: "UK postcode in normalized format",
    }),
    eastings: Type.Optional(
        Type.Number({
            description: "Ordnance Survey Easting coordinate",
        })
    ),
    northings: Type.Optional(
        Type.Number({
            description: "Ordnance Survey Northing coordinate",
        })
    ),
    country: Type.String({
        description:
            "Country name (England, Scotland, Wales, Northern Ireland)",
    }),
    longitude: Type.Number({
        description: "Longitude coordinate in WGS84 format",
    }),
    latitude: Type.Number({
        description: "Latitude coordinate in WGS84 format",
    }),
    region: Type.Optional(
        Type.String({
            description: "Region name",
        })
    ),
    parliamentary_constituency: Type.Optional(
        Type.String({
            description: "Parliamentary constituency name",
        })
    ),
    admin_district: Type.Optional(
        Type.String({
            description: "Administrative district name",
        })
    ),
    admin_ward: Type.Optional(
        Type.String({
            description: "Administrative ward name",
        })
    ),
    parish: Type.Optional(
        Type.String({
            description: "Parish name",
        })
    ),
    admin_county: Type.Union([Type.String(), Type.Null()], {
        description: "Administrative county name (can be null)",
    }),
    __v: Type.Optional(
        Type.Number({
            description: "Mongoose version key",
        })
    ),
})

// TypeBox schema for BusStop model response
// Based on the BusStop Mongoose model
export const BusStopResponseSchema = Type.Object({
    _id: Type.String({
        description: "MongoDB ObjectId of the bus stop",
    }),
    ATCO_long: Type.String({
        description: "Long ATCO code identifier",
    }),
    ATCO_short: Type.Optional(
        Type.String({
            description: "Short ATCO code identifier",
        })
    ),
    CommonName: Type.Optional(
        Type.String({
            description: "Common name of the bus stop",
        })
    ),
    Street: Type.Optional(
        Type.String({
            description: "Street name where the bus stop is located",
        })
    ),
    Longitude: Type.Optional(
        Type.String({
            description: "Longitude coordinate as string",
        })
    ),
    Latitude: Type.Optional(
        Type.String({
            description: "Latitude coordinate as string",
        })
    ),
    Northing: Type.String({
        description: "British National Grid Northing coordinate",
    }),
    Easting: Type.String({
        description: "British National Grid Easting coordinate",
    }),
    __v: Type.Optional(
        Type.Number({
            description: "Mongoose version key",
        })
    ),
})

// TypeBox schema for Crime model response
// Based on the Crime Mongoose model
export const CrimeResponseSchema = Type.Object({
    _id: Type.String({
        description: "MongoDB ObjectId of the crime record",
    }),
    crimeID: Type.Optional(
        Type.Number({
            description: "Unique crime identifier",
        })
    ),
    latitude: Type.Number({
        description: "Latitude coordinate of the crime location",
    }),
    longitude: Type.Number({
        description: "Longitude coordinate of the crime location",
    }),
    crime_category: Type.Optional(
        Type.String({
            description: "Category of the crime (e.g., anti-social-behaviour)",
        })
    ),
    crime_date: Type.Optional(
        Type.String({
            description: "Date of the crime in YYYY-MM format",
        })
    ),
    outcome_category: Type.Optional(
        Type.String({
            description: "Outcome category of the crime",
        })
    ),
    outcome_date: Type.Optional(
        Type.String({
            description: "Date of the crime outcome",
        })
    ),
    __v: Type.Optional(
        Type.Number({
            description: "Mongoose version key",
        })
    ),
})

// Main Search Response Schema
export const SearchResponseSchema = Type.Object({
    _id: Type.String({
        description: "MongoDB ObjectId of the search record",
    }),
    searchID: Type.Number({
        description: "Unique sequential search identifier",
    }),
    latitude: Type.Number({
        description: "Latitude coordinate in WGS84 format",
    }),
    longitude: Type.Number({
        description: "Longitude coordinate in WGS84 format",
    }),
    Northing: Type.String({
        description: "British National Grid Northing coordinate",
    }),
    Easting: Type.String({
        description: "British National Grid Easting coordinate",
    }),
    reverseLookup: Type.Boolean({
        description: "Whether this search was performed via reverse geocoding",
    }),
    Postcode: PostcodeResponseSchema,
    queryBusStops: Type.Array(BusStopResponseSchema, {
        description: "Array of nearby bus stops (up to 5)",
    }),
    queryCrimes: Type.Array(CrimeResponseSchema, {
        description: "Array of crimes in the area",
    }),
    linkedATCO: Type.Optional(
        Type.String({
            description:
                "MongoDB ObjectId reference to the linked ATCO code (not populated)",
        })
    ),
    linkedCrimeList: Type.Optional(
        Type.String({
            description:
                "MongoDB ObjectId reference to the linked CrimeList (not populated)",
        })
    ),
    _links: Type.Optional(LinksSchema),
    __v: Type.Optional(
        Type.Number({
            description: "Mongoose version key",
        })
    ),
})
*/

// ============================================================================
// FRONTEND ZOD SCHEMAS (Runtime Validation)
// ============================================================================

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

/**
 * Postcode response schema
 * Based on the Postcode Mongoose model
 *
 * Edge cases handled:
 * - Optional geographic fields (eastings, northings, region, etc.)
 * - Nullable admin_county field
 * - Optional Mongoose version key
 */
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

/**
 * Bus stop response schema
 * Based on the BusStop Mongoose model
 *
 * Edge cases handled:
 * - Optional identification fields (ATCO_short, CommonName, Street)
 * - Optional coordinate fields stored as strings (Longitude, Latitude)
 * - Required British National Grid coordinates (Northing, Easting)
 */
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

/**
 * Crime response schema
 * Based on the Crime Mongoose model
 *
 * Edge cases handled:
 * - Optional crime metadata (crimeID, category, dates, outcome)
 * - Date fields stored as strings in YYYY-MM format
 * - Required location coordinates
 */
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
 * Main search response schema
 * Aggregates postcode, bus stop, and crime data for a location
 *
 * Edge cases handled:
 * - Optional MongoDB reference fields (linkedATCO, linkedCrimeList)
 * - Optional HATEOAS links
 * - Arrays with nested object validation (queryBusStops, queryCrimes)
 * - Mixed coordinate formats (numbers for WGS84, strings for British National Grid)
 */
export const SearchResponseSchema = z.object({
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

// ============================================================================
// EXPORTED TYPESCRIPT TYPES (Inferred from Zod Schemas)
// ============================================================================

/**
 * Type for HATEOAS link
 * Inferred from LinkSchema
 */
export type Link = z.infer<typeof LinkSchema>;

/**
 * Type for HATEOAS links object
 * Inferred from LinksSchema
 */
export type Links = z.infer<typeof LinksSchema>;

/**
 * Type for postcode response
 * Inferred from PostcodeResponseSchema
 */
export type PostcodeResponse = z.infer<typeof PostcodeResponseSchema>;

/**
 * Type for bus stop response
 * Inferred from BusStopResponseSchema
 */
export type BusStopResponse = z.infer<typeof BusStopResponseSchema>;

/**
 * Type for crime response
 * Inferred from CrimeResponseSchema
 */
export type CrimeResponse = z.infer<typeof CrimeResponseSchema>;

/**
 * Type for main search response
 * Inferred from SearchResponseSchema
 *
 * This is the primary type to use when working with search API responses
 */
export type SearchResponse = z.infer<typeof SearchResponseSchema>;

// ============================================================================
// FRONTEND DATA MODELS (Clean UI-Focused Schemas)
// ============================================================================
// These schemas represent cleaned data structures optimized for frontend use.
// They exclude MongoDB metadata (_id, __v) and HATEOAS links (_links).
// Use these types in your React components and UI logic.
// ============================================================================

/**
 * Clean postcode data for frontend consumption
 * Excludes: _id, __v (MongoDB metadata)
 *
 * Edge cases handled:
 * - Optional geographic and administrative fields
 * - Nullable admin_county
 */
export const FrontendPostcodeSchema = z.object({
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
});

/**
 * Clean bus stop data for frontend consumption
 * Excludes: _id, __v (MongoDB metadata)
 *
 * Edge cases handled:
 * - Optional identification and location fields
 * - Coordinate type preservation (strings from backend)
 */
export const FrontendBusStopSchema = z.object({
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
});

/**
 * Clean crime data for frontend consumption
 * Excludes: _id, __v (MongoDB metadata)
 *
 * Edge cases handled:
 * - Optional crime metadata fields
 * - Date strings in YYYY-MM format
 */
export const FrontendCrimeSchema = z.object({
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
});

/**
 * Search metadata section
 * Contains search identifier, coordinates, and postcode information
 *
 * Edge cases handled:
 * - Multiple coordinate systems (WGS84 numbers, British National Grid strings)
 * - Nested postcode object with all administrative data
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
  Postcode: FrontendPostcodeSchema,
});

/**
 * Organized frontend search response
 * Structured in three clear sections for UI consumption
 * Excludes: MongoDB metadata, HATEOAS links, internal references
 *
 * Structure:
 * 1. SearchMetadata - Search context and postcode info
 * 2. QueryBusStops - Nearby transportation
 * 3. QueryCrimes - Local crime data
 */
export const FrontendSearchResponseSchema = z.object({
  SearchMetadata: SearchMetadataSchema,
  QueryBusStops: z
    .array(FrontendBusStopSchema)
    .describe("Array of nearby bus stops (up to 5)"),
  QueryCrimes: z
    .array(FrontendCrimeSchema)
    .describe("Array of crimes in the area"),
});

// ============================================================================
// FRONTEND TYPESCRIPT TYPES (Inferred from Frontend Schemas)
// ============================================================================

/**
 * Type for clean postcode data
 * Use this type in your components
 */
export type FrontendPostcode = z.infer<typeof FrontendPostcodeSchema>;

/**
 * Type for clean bus stop data
 * Use this type in your components
 */
export type FrontendBusStop = z.infer<typeof FrontendBusStopSchema>;

/**
 * Type for clean crime data
 * Use this type in your components
 */
export type FrontendCrime = z.infer<typeof FrontendCrimeSchema>;

/**
 * Type for search metadata section
 * Use this type when working with search context
 */
export type SearchMetadata = z.infer<typeof SearchMetadataSchema>;

/**
 * Type for organized frontend search response
 * This is the PRIMARY type to use in your application
 *
 * @example
 * const response: FrontendSearchResponse = await searchByPostcode(formData);
 * console.log(response.SearchMetadata.Postcode.postcode);
 * console.log(response.QueryBusStops[0].CommonName);
 * console.log(response.QueryCrimes.length);
 */
export type FrontendSearchResponse = z.infer<
  typeof FrontendSearchResponseSchema
>;

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Type-safe validation result
 * Encapsulates successful validation or typed errors
 */
export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: z.ZodError };

/**
 * Validates and parses backend search response data
 *
 * @param data - Unknown data from API response
 * @returns ValidationResult with typed backend data or Zod errors
 *
 * @example
 * const result = validateBackendSearchResponse(apiData);
 * if (result.success) {
 *   const frontendData = transformToFrontendResponse(result.data);
 * } else {
 *   console.error(result.error.format());
 * }
 */
export function validateBackendSearchResponse(
  data: unknown
): ValidationResult<SearchResponse> {
  const result = SearchResponseSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Validates frontend search response data
 * Use this when you want to validate transformed data
 *
 * @param data - Unknown data to validate as frontend response
 * @returns ValidationResult with typed frontend data or Zod errors
 */
export function validateFrontendSearchResponse(
  data: unknown
): ValidationResult<FrontendSearchResponse> {
  const result = FrontendSearchResponseSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

// ============================================================================
// TRANSFORMATION LAYER
// ============================================================================

/**
 * Transforms backend postcode response to clean frontend format
 * Strips MongoDB metadata (_id, __v)
 *
 * @param backendPostcode - Validated backend postcode data
 * @returns Clean frontend postcode data
 */
function transformPostcode(
  backendPostcode: PostcodeResponse
): FrontendPostcode {
  return {
    postcode: backendPostcode.postcode,
    eastings: backendPostcode.eastings,
    northings: backendPostcode.northings,
    country: backendPostcode.country,
    longitude: backendPostcode.longitude,
    latitude: backendPostcode.latitude,
    region: backendPostcode.region,
    parliamentary_constituency: backendPostcode.parliamentary_constituency,
    admin_district: backendPostcode.admin_district,
    admin_ward: backendPostcode.admin_ward,
    parish: backendPostcode.parish,
    admin_county: backendPostcode.admin_county,
  };
}

/**
 * Transforms backend bus stop response to clean frontend format
 * Strips MongoDB metadata (_id, __v)
 *
 * @param backendBusStop - Validated backend bus stop data
 * @returns Clean frontend bus stop data
 */
function transformBusStop(backendBusStop: BusStopResponse): FrontendBusStop {
  return {
    ATCO_long: backendBusStop.ATCO_long,
    ATCO_short: backendBusStop.ATCO_short,
    CommonName: backendBusStop.CommonName,
    Street: backendBusStop.Street,
    Longitude: backendBusStop.Longitude,
    Latitude: backendBusStop.Latitude,
    Northing: backendBusStop.Northing,
    Easting: backendBusStop.Easting,
  };
}

/**
 * Transforms backend crime response to clean frontend format
 * Strips MongoDB metadata (_id, __v)
 *
 * @param backendCrime - Validated backend crime data
 * @returns Clean frontend crime data
 */
function transformCrime(backendCrime: CrimeResponse): FrontendCrime {
  return {
    crimeID: backendCrime.crimeID,
    latitude: backendCrime.latitude,
    longitude: backendCrime.longitude,
    crime_category: backendCrime.crime_category,
    crime_date: backendCrime.crime_date,
    outcome_category: backendCrime.outcome_category,
    outcome_date: backendCrime.outcome_date,
  };
}

/**
 * Transforms backend search response to organized frontend format
 *
 * This function:
 * 1. Validates the backend response structure
 * 2. Strips MongoDB metadata (_id, __v)
 * 3. Removes HATEOAS links (_links)
 * 4. Removes internal references (linkedATCO, linkedCrimeList)
 * 5. Organizes data into three clear sections
 *
 * @param backendResponse - Validated backend search response
 * @returns Organized frontend search response with three sections
 *
 * @example
 * const backendData = await fetch('/api/search').then(r => r.json());
 * const validation = validateBackendSearchResponse(backendData);
 * if (validation.success) {
 *   const frontendData = transformToFrontendResponse(validation.data);
 *   // Use frontendData.SearchMetadata, frontendData.QueryBusStops, frontendData.QueryCrimes
 * }
 */
export function transformToFrontendResponse(
  backendResponse: SearchResponse
): FrontendSearchResponse {
  return {
    SearchMetadata: {
      searchID: backendResponse.searchID,
      latitude: backendResponse.latitude,
      longitude: backendResponse.longitude,
      Northing: backendResponse.Northing,
      Easting: backendResponse.Easting,
      reverseLookup: backendResponse.reverseLookup,
      Postcode: transformPostcode(backendResponse.Postcode),
    },
    QueryBusStops: backendResponse.queryBusStops.map(transformBusStop),
    QueryCrimes: backendResponse.queryCrimes.map(transformCrime),
  };
}

/**
 * Validates and transforms backend API response to frontend format
 * This is the main function to use in your server actions
 *
 * Performs complete validation and transformation pipeline:
 * 1. Validates raw API data against backend schema
 * 2. Transforms to clean frontend format
 * 3. Returns typed result or validation errors
 *
 * @param data - Unknown data from backend API
 * @returns ValidationResult with frontend data or errors
 *
 * @example
 * // In your server action:
 * export async function searchByPostcode(formData: FormData) {
 *   const response = await fetch(backendUrl);
 *   const rawData = await response.json();
 *
 *   const result = validateAndTransformSearchResponse(rawData);
 *   if (!result.success) {
 *     console.error("Validation failed:", result.error.format());
 *     throw new Error("Invalid API response");
 *   }
 *
 *   return result.data; // Type: FrontendSearchResponse
 * }
 */
export function validateAndTransformSearchResponse(
  data: unknown
): ValidationResult<FrontendSearchResponse> {
  // Step 1: Validate backend response
  const backendValidation = validateBackendSearchResponse(data);
  if (!backendValidation.success) {
    return { success: false, error: backendValidation.error };
  }

  // Step 2: Transform to frontend format
  const frontendData = transformToFrontendResponse(backendValidation.data);

  // Step 3: Validate transformed data (safety check)
  const frontendValidation = validateFrontendSearchResponse(frontendData);
  if (!frontendValidation.success) {
    return { success: false, error: frontendValidation.error };
  }

  return { success: true, data: frontendValidation.data };
}
