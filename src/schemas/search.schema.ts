/**
 * Search Schema Index
 *
 * Central export point for all search-related schemas.
 * Organizes backend contracts and frontend schemas.
 *
 * @module schemas/search
 */

export {
  SearchAPIResponseSchema,
  type SearchAPIResponse,
} from "@/schemas/backend/searchResponse.schema";
export {
  SearchResponseSchema,
  type SearchResponse,
  type FrontendPostcode,
} from "@/schemas/frontend/searchPage.schema";
export { SearchBodySchema } from "@/schemas/request/SearchBody.schema";
