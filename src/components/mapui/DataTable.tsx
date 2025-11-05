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
import { Button } from "@/components/ui/button";

export interface DataTableRow {
	id: number;
	postcode: string;
	lat: number;
	long: number;
	country: string;
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
						<TableHead>Postcode</TableHead>
						<TableHead>Latitude</TableHead>
						<TableHead>Longitude</TableHead>
						<TableHead>Country</TableHead>
						<TableHead className="w-[160px]"></TableHead>
						<TableHead>Show Transport Nodes</TableHead>
						<TableHead>Show Recent Crimes</TableHead>
						<TableHead>View Postcode Data</TableHead>
						<TableHead>Focus on Map</TableHead>
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
								{rowdata.country}
							</TableCell>
							<TableCell></TableCell>
							<TableCell className="align-middle">
								<Checkbox /> Toggle Nodes
							</TableCell>
							<TableCell className="">
								<Checkbox /> Toggle Crimes
							</TableCell>
							<TableCell className="">
								<Button>Click to view</Button>
							</TableCell>
							<TableCell className="">
								<Button>Focus</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
