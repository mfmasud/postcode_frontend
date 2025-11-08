import type { SearchResponse } from "@/schemas/search.schema";
import type { DataTableRow } from "@/components/mapui/DataTable";

export function mapSearchResponseToRow(resp: SearchResponse): DataTableRow {
  const { metadata } = resp;
  const { Postcode } = metadata;

  return {
    id: metadata.searchID,
    postcode: Postcode.postcode,
    lat: metadata.latitude,
    long: metadata.longitude,
    country: Postcode.country,
  };
}
