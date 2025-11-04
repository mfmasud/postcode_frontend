"use client";

interface PostcodeSearchBoxProps {
	formAction: (formData: FormData) => void;
	isPending: boolean;
	defaultValue?: string;
}

export function PostcodeSearchBox({
	formAction,
	isPending,
	defaultValue = "",
}: PostcodeSearchBoxProps) {
	return (
		<form action={formAction} className="space-x-2">
			<input
				name="postcode"
				type="text"
				placeholder="Enter a valid UK postcode:"
				defaultValue={defaultValue}
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
	);
}
