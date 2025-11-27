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
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	createColumnHelper,
	type SortingState,
	getExpandedRowModel,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import type {
	FrontendBusStop,
	FrontendCrime,
} from "@/schemas/frontend/searchPage.schema";
import React from "react";

export interface DataTableRow {
	id: number;
	postcode: string;
	lat: number;
	long: number;
	country: string;
	crimes?: FrontendCrime[];
	stops?: FrontendBusStop[];
	createdAt: number;
	hidden: boolean;
}

type DataTableProps = {
	data: DataTableRow[] | null;
};

export function DataTable({ data }: DataTableProps) {
	const [sorting, setSorting] = useState<SortingState>([]);

	const columnHelper = createColumnHelper<DataTableRow>();

	const columns = useMemo(
		() => [
			columnHelper.accessor("postcode", {
				header: "Postcode",
				cell: (info) => (
					<span className="font-mono font-medium">{info.getValue()}</span>
				),
			}),
			columnHelper.accessor("lat", {
				header: "Latitude",
				cell: (info) => (
					<span className="font-mono text-muted-foreground">
						{info.getValue()}
					</span>
				),
			}),
			columnHelper.accessor("long", {
				header: "Longitude",
				cell: (info) => (
					<span className="font-mono text-muted-foreground">
						{info.getValue()}
					</span>
				),
			}),
			columnHelper.accessor("country", {
				header: "Country",
				cell: (info) => (
					<span className="font-mono text-muted-foreground">
						{info.getValue()}
					</span>
				),
			}),
			columnHelper.display({
				id: "toggleNodes",
				header: "Show Transport Nodes",
				cell: ({ row }) => {
					const hasStops =
						(row.original.stops && row.original.stops.length > 0) ?? false;

					return (
						<div className="text-center">
							{hasStops ? (
								<>
									<Checkbox />
									{"Toggle Nodes"}
								</>
							) : (
								<span className="text-muted-foreground font-medium">
									{"No Data"}
								</span>
							)}
						</div>
					);
				},
			}),
			columnHelper.display({
				id: "toggleCrimes",
				header: "Show Recent Crimes",
				cell: ({ row }) => {
					const hasCrimes =
						(row.original.crimes && row.original.crimes.length > 0) ?? false;

					return (
						<div className="text-center">
							{hasCrimes ? (
								<>
									<Checkbox />
									{"Toggle Crimes"}
								</>
							) : (
								<span className="text-muted-foreground font-medium">
									No Data
								</span>
							)}
						</div>
					);
				},
			}),
			columnHelper.display({
				id: "viewData",
				header: "View Postcode Data",
				cell: ({ row }) => (
					<div className="text-center">
						<Button onClick={row.getToggleExpandedHandler()}>
							{row.getIsExpanded() ? "Hide Details" : "Click to view"}
						</Button>
					</div>
				),
			}),
			columnHelper.display({
				id: "showHousePrices_external",
				header: "View House Price Data",
				cell: ({ row }) => {
					const rawPostcode = row.original.postcode ?? "";
					const postcode = rawPostcode.toLowerCase().trim().replace(/\s+/, "-"); // replaces first space between outcode & incode with a hyphen
					const url = `https://www.rightmove.co.uk/house-prices/${postcode}.html`;
					return (
						<Button asChild variant="link">
							<a href={url} target="_blank" rel="noopener noreferrer">
								View on Rightmove
							</a>
						</Button>
					);
				},
			}),
			columnHelper.display({
				id: "focusMap",
				header: "Focus on Map",
				cell: () => (
					<div className="text-center">
						<Button>Focus</Button>
					</div>
				),
			}),
		],
		[columnHelper],
	);

	const table = useReactTable({
		data: data || [],
		columns,
		initialState: {
			sorting: [{ id: "createdAt", desc: true }],
		},
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		state: {
			sorting,
		},
		getRowCanExpand: () => true,
		getExpandedRowModel: getExpandedRowModel(),
	});

	if (!data || data.length === 0) {
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
				<TableHeader className="bg-background ">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id} className="divide-x">
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.map((row) => (
						<React.Fragment key={row.id}>
							<TableRow
								key={row.id}
								className="divide-x odd:bg-secondary even:bg-background"
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
							{row.getIsExpanded() && (
								<TableRow>
									<TableCell colSpan={columns.length}>
										{row.original.crimes && row.original.crimes.length > 0 && (
											<div>
												<h4 className="font-semibold">Crimes:</h4>
												<pre className="whitespace-pre-wrap text-sm">
													{JSON.stringify(row.original.crimes, null, 2)}
												</pre>
											</div>
										)}

										{row.original.stops && row.original.stops.length > 0 && (
											<div className="mt-4">
												<h4 className="font-semibold">Transport Stops:</h4>
												<pre className="whitespace-pre-wrap text-sm">
													{JSON.stringify(row.original.stops, null, 2)}
												</pre>
											</div>
										)}

										{(!row.original.crimes ||
											row.original.crimes.length === 0) &&
											(!row.original.stops ||
												row.original.stops.length === 0) && (
												<p>No additional data available for this postcode.</p>
											)}
									</TableCell>
								</TableRow>
							)}
						</React.Fragment>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
