"use client";

import { Suspense, useActionState, useEffect } from "react";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("../mapui/LeafletMap"), {
	ssr: false,
});

import { DataTable, type DataTableRow } from "@/components/mapui/DataTable";
import { PostcodeSearchBox } from "./PostcodeSearchBox";

import {
	searchByPostcode,
	type searchByPostcodeState,
} from "@/app/actions/SearchAction";

import { useSearchStore } from "@/stores/searchStore";
import { mapSearchResponseToRow } from "@/lib/SearchDataTable";

import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Database } from "lucide-react";
import { useMapStore } from "@/stores/mapStore";

const initialState: searchByPostcodeState = {
	success: false,
	error: undefined,
	data: undefined,
	entered_postcode: "",
};

export default function MapApplication() {
	const [state, formAction, isPending] = useActionState<
		searchByPostcodeState,
		FormData
	>(searchByPostcode, initialState);

	const { add } = useSearchStore();
	const { setCenter, setZoom, setMarkers } = useMapStore();

	useEffect(() => {
		if (state.success && state.data) {
			// store the successful search result in Zustand
			add(state.data);
		}

		if (state.success && state.data) {
			setMarkers([
				{
					position: [
						state.data.metadata.Postcode.latitude,
						state.data.metadata.Postcode.longitude,
					],
					popup: state.data.metadata.Postcode.postcode,
				},
			]);
			setCenter([
				state.data.metadata.Postcode.latitude,
				state.data.metadata.Postcode.longitude,
			]);
			setZoom(13);
		}
	}, [state.success, state.data, add, setMarkers, setCenter, setZoom]);

	const itemsMap = useSearchStore((state) => state.items);
	const tabledata: DataTableRow[] = Object.values(itemsMap).map((savedSearch) =>
		mapSearchResponseToRow(savedSearch),
	);

	return (
		<div className="grid gap-6 grid-cols-1 lg:grid-cols-5">
			{/* Sidebar */}
			<aside className="space-y-4 col-span-1">
				<Card className="p-4 flex flex-col">
					<h2 className="font-semibold mb-4 flex items-center gap-2">
						<Database className="h-4 w-4" />
						Data Controls
					</h2>
					<div>
						<PostcodeSearchBox
							formAction={formAction}
							isPending={isPending}
							defaultValue={state.entered_postcode ?? ""}
						/>
					</div>
				</Card>
			</aside>

			{/* Main Content */}
			<div className="space-y-6 col-span-1 lg:col-span-4">
				<Card className="h-[500px] overflow-hidden p-1">
					<Suspense
						fallback={
							<div className="flex items-center justify-center bg-muted/20">
								<Spinner className="h-8 w-8" />
							</div>
						}
					>
						<LeafletMap />
					</Suspense>
				</Card>
			</div>

			{/* Location Table */}
			<div className="col-span-1 lg:col-span-5">
				<Card className="p-6">
					<h2 className="text-xl font-semibold mb-4">Location Data</h2>
					<Suspense
						fallback={
							<div className="flex items-center justify-center py-8">
								<Spinner className="h-6 w-6" />
							</div>
						}
					>
						<DataTable data={tabledata} />
					</Suspense>
				</Card>
			</div>

			{state.error !== undefined && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					<p className="font-semibold">Error</p>
					{state.error?.pretty ? (
						<pre className="whitespace-pre-wrap font-mono text-sm">
							{state.error.pretty}
						</pre>
					) : (
						<p>{state.error?.msg}</p>
					)}
				</div>
			)}

			{state?.success === true && state.data !== undefined && (
				<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded col-span-5">
					<p className="font-semibold mb-2">Success</p>
					<pre className="bg-white p-4 rounded overflow-x-auto text-gray-800">
						{JSON.stringify(state.data as Record<string, unknown>, null, 2)}
					</pre>
				</div>
			)}
		</div>
	);
}
