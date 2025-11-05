import type { SearchResponse } from "@/schemas/search.schema";
import type { DataTableRow } from "@/components/mapui/DataTable";

export function mapSearchResponseToRow(
  resp: SearchResponse | undefined
): DataTableRow {
  return {
    id: 123,
    postcode: "test",
    hasNPTG: true,
    hasCrimes: false,
  };
}

export function mergeRowsDedup(
  existing: DataTableRow[],
  incoming: DataTableRow
): DataTableRow[] {
  const seen = new Set(existing.map((r) => r.id));
  if (seen.has(incoming.id)) return existing;
  return [...existing, incoming];
}
