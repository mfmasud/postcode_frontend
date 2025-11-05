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
	hasNPTG: boolean;
	hasCrimes: boolean;
}

type DataTableProps = {
	data: DataTableRow[];
};

export function DataTable({ data }: DataTableProps) {
	if (data.length === 0) {
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
								{rowdata.id}
							</TableCell>
							<TableCell className="font-mono text-muted-foreground">
								{rowdata.postcode}
							</TableCell>
							<TableCell className="font-mono text-muted-foreground">
								<Checkbox checked={rowdata.hasNPTG} disabled />
							</TableCell>
							<TableCell className="font-mono text-muted-foreground">
								<Checkbox checked={rowdata.hasCrimes} disabled />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
