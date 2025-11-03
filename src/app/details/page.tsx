"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("../components/mapui/LeafletMap"), {
	ssr: false,
});
import { DataTable } from "@/app/components/mapui/DataTable";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Database, MapPin } from "lucide-react";

export default function MapApplication() {
	return (
		<main className="min-h-screen bg-background">
			<div className="container mx-auto p-4 lg:p-6">
				<header className="mb-6">
					<div className="flex items-center gap-3 mb-2">
						<MapPin className="h-8 w-8 text-primary" />
						<h1 className="text-3xl font-bold text-balance">
							UK Location Data Explorer
						</h1>
					</div>
					<p className="text-muted-foreground text-pretty">
						Use the search area below to search for a UK postcode and view data
						for that postcode!
					</p>
				</header>

				<div className="grid gap-6 grid-cols-1 lg:grid-cols-5">
					{/* Sidebar */}
					<aside className="space-y-4 col-span-1">
						<Card className="p-4">
							<h2 className="font-semibold mb-4 flex items-center gap-2">
								<Database className="h-4 w-4" />
								Data Controls
							</h2>
							<Button className="w-full" size="lg">
								Fetch Location Data
							</Button>
						</Card>

						<Card className="p-4">
							<h2 className="font-semibold mb-4 flex items-center gap-2">
								Search for a postcode (coming soon)
							</h2>
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
								<DataTable data={[]} />
							</Suspense>
						</Card>
					</div>
				</div>
			</div>
		</main>
	);
}
