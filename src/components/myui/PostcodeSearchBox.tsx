"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface PostcodeSearchBoxProps {
	formAction: (formData: FormData) => void;
	isPending: boolean;
	defaultValue?: string;
}

const SUGGESTED_SEARCHES = ["GL1 1LB", "SW1A 2AA"];

export function PostcodeSearchBox({
	formAction,
	isPending,
	defaultValue = "",
}: PostcodeSearchBoxProps) {
	const [inputValue, setInputValue] = useState<string>(defaultValue);

	// Sync with parent defaultValue when it changes
	useEffect(() => {
		setInputValue(defaultValue);
	}, [defaultValue]);

	const handleSuggestionClick = (postcode: string) => {
		setInputValue(postcode);
	};

	return (
		<div className="space-y-3">
			<form action={formAction} className="space-y-2">
				<input
					name="postcode"
					type="text"
					placeholder="Enter a valid UK postcode:"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					className="border p-2 rounded"
					required
				/>
				<Button type="submit" disabled={isPending}>
					{isPending ? "Searching..." : "Search"}
				</Button>
			</form>
			<div className="flex flex-col gap-2">
				<p className="text-sm text-muted-foreground">Examples:</p>
				<div className="flex gap-2 flex-wrap">
					{SUGGESTED_SEARCHES.map((postcode) => (
						<Button
							key={postcode}
							type="button"
							variant="outline"
							size="sm"
							onClick={() => handleSuggestionClick(postcode)}
							className="text-xs"
						>
							{postcode}
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}
