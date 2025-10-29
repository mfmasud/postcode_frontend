"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface LocationData {
	id: string;
	postcode: string;
	lat: number;
	long: number;
	type: string;
}

type DataTableProps = {
	data: LocationData[];
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
						<TableHead>Postcode</TableHead>
						<TableHead>Latitude</TableHead>
						<TableHead>Longitude</TableHead>
						<TableHead>Type</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((location) => (
						<TableRow key={location.id}>
							<TableCell className="font-mono font-medium">
								{location.postcode}
							</TableCell>
							<TableCell className="font-mono text-muted-foreground">
								{location.lat.toFixed(4)}
							</TableCell>
							<TableCell className="font-mono text-muted-foreground">
								{location.long.toFixed(4)}
							</TableCell>
							<TableCell>
								<Badge variant="default">{location.type}</Badge>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
