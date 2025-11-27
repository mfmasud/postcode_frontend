import type { DataTableRow } from "@/components/mapui/DataTable";
import type { SearchResponseWithMetadata } from "@/stores/searchStore";

export function mapSearchResponseToRow(
  item: SearchResponseWithMetadata
): DataTableRow {
  const { response: resp } = item;
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
    createdAt: item.createdAt,
    hidden: item.hidden,
  };
}
