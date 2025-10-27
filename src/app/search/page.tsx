"use client";

import { useActionState } from "react";
import {
	searchByPostcode,
	type searchByPostcodeState,
} from "@/app/search/actions";

const initialState: searchByPostcodeState = {
	success: false,
	error: undefined,
	data: undefined,
	entered_postcode: "",
};

export default function SearchPage() {
	const [state, formAction, isPending] = useActionState<
		searchByPostcodeState,
		FormData
	>(searchByPostcode, initialState);

	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-semibold">Search</h1>

			<form action={formAction} className="space-x-2">
				<input
					name="postcode"
					type="text"
					placeholder="Enter a valid UK postcode:"
					defaultValue={state.entered_postcode ?? ""}
					className="border p-2 rounded"
					required
				/>
				<button
					type="submit"
					disabled={isPending}
					className="bg-blue-600 text-white px-4 py-2 rounded"
				>
					{isPending ? "Searching..." : "Search"}
				</button>
			</form>

			{state.error !== undefined && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					<p className="font-semibold">Error</p>
					<p>{state.error?.msg}</p>
					{state.error?.issues && (
						<ul>
							{state.error.issues.map((issue) => (
								<li key={issue}>{issue}</li>
							))}
						</ul>
					)}
				</div>
			)}

			{state?.success === true && state.data !== undefined && (
				<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
					<p className="font-semibold mb-2">Success</p>
					<pre className="bg-white p-4 rounded overflow-x-auto text-gray-800">
						{JSON.stringify(state.data as Record<string, unknown>, null, 2)}
					</pre>
				</div>
			)}
		</div>
	);
}
