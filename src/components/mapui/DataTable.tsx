"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

export interface DataTableRow {
	id: number;
	postcode: string;
	lat: number;
	long: number;
}

type DataTableProps = {
	data: DataTableRow[] | null;
};

export function DataTable({ data }: DataTableProps) {
	if (data === null || data?.length === 0) {
		return (
			<div className="text-center py-8 text-muted-foreground">
				No data to display. Search for a postcode to view data for that
				postcode.
			</div>
		);
	}

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>SearchID</TableHead>
						<TableHead>Postcode</TableHead>
						<TableHead>Show Bus Stops</TableHead>
						<TableHead>Show Recent Crimes</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((rowdata: DataTableRow) => (
						<TableRow key={rowdata.id}>
							<TableCell className="font-mono font-medium">
								{rowdata.postcode}
							</TableCell>
							<TableCell className="font-mono text-muted-foreground">
								{rowdata.lat}
							</TableCell>
							<TableCell className="font-mono text-muted-foreground">
								{rowdata.long}
							</TableCell>
							<TableCell className="font-mono text-muted-foreground">
								<Checkbox />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
