// Server Component: src/app/search/page.tsx
import { searchByCoordinates, searchByPostcode } from "@/app/search/actions";

export default async function SearchPage({
	searchParams,
}: {
	searchParams: Promise<Record<string, string>>;
}) {
	const params = await searchParams;
	const latitude = params.latitude;
	const longitude = params.longitude;

	let data: unknown;

	// Example: query-based search
	if (latitude && longitude) {
		data = await searchByCoordinates(Number(latitude), Number(longitude));
	}

	// Example: simple form submission for postcode
	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-semibold">Search</h1>

			<form action={searchByPostcode}>
				<input
					name="postcode"
					type="text"
					placeholder="Enter a valid UK postcode:"
					className="border p-2 rounded"
					required
				/>
				<button
					type="submit"
					className="bg-blue-600 text-white px-4 py-2 rounded"
				>
					Search
				</button>
			</form>

			{data !== undefined && (
				<pre className="bg-gray-100 p-4 rounded">
					{JSON.stringify(data as Record<string, unknown>, null, 2)}
				</pre>
			)}
		</div>
	);
}
