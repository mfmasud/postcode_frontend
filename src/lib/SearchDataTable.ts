import type { SearchResponse } from "@/schemas/search.schema";
import type { DataTableRow } from "@/components/mapui/DataTable";

export function mapSearchResponseToRow(
  resp: SearchResponse | undefined
): DataTableRow | null {
  if (resp !== undefined && resp !== null) {
    return {
      id: resp.metadata.searchID,
      postcode: resp.metadata.Postcode.postcode,
      lat: resp.metadata.latitude,
      long: resp.metadata.longitude,
    };
  }
  return null;
}

export function mergeRowsDedup(
  existing: DataTableRow[],
  incoming: DataTableRow
): DataTableRow[] {
  const seen = new Set(existing.map((r) => r.id));
  if (seen.has(incoming.id)) return existing;
  return [...existing, incoming];
}
