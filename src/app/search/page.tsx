"use client";

import { useActionState } from "react";
import {
	searchByPostcode,
	type searchByPostcodeState,
} from "@/app/search/actions";
import { PostcodeSearchBox } from "@/components/PostcodeSearchBox";

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

			<PostcodeSearchBox
				formAction={formAction}
				isPending={isPending}
				defaultValue={state.entered_postcode ?? ""}
			/>

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
