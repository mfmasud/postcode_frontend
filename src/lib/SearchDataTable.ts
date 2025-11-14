import type { DataTableRow } from "@/components/mapui/DataTable";
import type { SearchResponseWithTimestamp } from "@/stores/searchStore";

export function mapSearchResponseToRow(
  item: SearchResponseWithTimestamp
): DataTableRow {
  const { response: resp, createdAt } = item;
  const { metadata } = resp;
  const { Postcode } = metadata;

  return {
    id: metadata.searchID,
    postcode: Postcode.postcode,
    lat: metadata.latitude,
    long: metadata.longitude,
    country: Postcode.country,
    crimes: resp.queryCrimes ?? null,
    stops: resp.queryBusStops ?? null,
    createdAt: createdAt,
  };
}
