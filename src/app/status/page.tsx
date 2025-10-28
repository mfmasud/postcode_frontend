"use client";

import { useActionState, useEffect, startTransition } from "react";
import { healthAction, type HealthState } from "@/app/actions/healthAction";
import { formatUptime, formatTimestamp } from "@/lib/formatters";

const initialState: HealthState = {
	success: false,
	error: undefined,
	data: undefined,
};

export default function StatusPage() {
	const [state, formAction, isPending] = useActionState<HealthState, FormData>(
		healthAction,
		initialState,
	);

	// Auto-fetch on mount
	useEffect(() => {
		startTransition(() => {
			const form = new FormData();
			formAction(form);
		});
	}, [formAction]);

	const handleRefresh = () => {
		startTransition(() => {
			const form = new FormData();
			formAction(form);
		});
	};

	return (
		<div className="space-y-6 max-w-2xl mx-auto p-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">System Status</h1>
				<button
					type="button"
					onClick={handleRefresh}
					disabled={isPending}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
				>
					{isPending ? "Refreshing..." : "Refresh"}
				</button>
			</div>

			{/* Loading State */}
			{isPending && state.data === undefined && (
				<div className="bg-blue-50 border border-blue-300 text-blue-700 px-4 py-3 rounded">
					<p className="font-semibold">Loading...</p>
					<p className="text-sm">Checking system health status</p>
				</div>
			)}

			{/* Error State */}
			{state.error !== undefined && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					<p className="font-semibold">Error</p>
					{state.error.pretty ? (
						<pre className="whitespace-pre-wrap font-mono text-sm mt-2">
							{state.error.pretty}
						</pre>
					) : (
						<p>{state.error.msg}</p>
					)}
				</div>
			)}

			{/* Success State */}
			{state.success && state.data !== undefined && (
				<div className="space-y-4">
					{/* Overall Status Card */}
					<div
						className={`border-2 rounded-lg p-6 ${
							state.data.status === "healthy"
								? "bg-green-50 border-green-400"
								: "bg-red-50 border-red-400"
						}`}
					>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600 uppercase">
									Overall Status
								</p>
								<p
									className={`text-3xl font-bold mt-1 ${
										state.data.status === "healthy"
											? "text-green-700"
											: "text-red-700"
									}`}
								>
									{state.data.status === "healthy"
										? "✓ Healthy"
										: "✗ Unhealthy"}
								</p>
							</div>
							<div
								className={`w-16 h-16 rounded-full flex items-center justify-center ${
									state.data.status === "healthy"
										? "bg-green-500"
										: "bg-red-500"
								}`}
							>
								<span className="text-white text-3xl">
									{state.data.status === "healthy" ? "✓" : "✗"}
								</span>
							</div>
						</div>
					</div>

					{/* Metrics Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Timestamp Card */}
						<div className="bg-white border border-gray-300 rounded-lg p-4">
							<p className="text-sm font-medium text-gray-600 uppercase mb-2">
								Last Checked
							</p>
							<p className="text-lg font-semibold text-gray-800">
								{formatTimestamp(state.data.timestamp)}
							</p>
							<p className="text-xs text-gray-500 mt-1 font-mono">
								{state.data.timestamp}
							</p>
						</div>

						{/* Uptime Card */}
						<div className="bg-white border border-gray-300 rounded-lg p-4">
							<p className="text-sm font-medium text-gray-600 uppercase mb-2">
								System Uptime
							</p>
							<p className="text-lg font-semibold text-gray-800">
								{formatUptime(state.data.uptime)}
							</p>
							<p className="text-xs text-gray-500 mt-1">
								{state.data.uptime.toFixed(2)} seconds
							</p>
						</div>
					</div>

					{/* Database Status Card */}
					<div
						className={`border-2 rounded-lg p-4 ${
							state.data.database.connected
								? "bg-green-50 border-green-300"
								: "bg-red-50 border-red-300"
						}`}
					>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600 uppercase mb-2">
									Database Status
								</p>
								<div className="space-y-1">
									<div className="flex items-center gap-2">
										<span className="text-xs font-medium text-gray-600">
											Connection:
										</span>
										<span
											className={`text-sm font-semibold ${
												state.data.database.connected
													? "text-green-700"
													: "text-red-700"
											}`}
										>
											{state.data.database.connected
												? "Connected"
												: "Disconnected"}
										</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-xs font-medium text-gray-600">
											Status:
										</span>
										<span
											className={`text-sm font-semibold ${
												state.data.database.status === "connected"
													? "text-green-700"
													: "text-red-700"
											}`}
										>
											{state.data.database.status}
										</span>
									</div>
								</div>
							</div>
							<div
								className={`w-12 h-12 rounded-full flex items-center justify-center ${
									state.data.database.connected ? "bg-green-500" : "bg-red-500"
								}`}
							>
								<span className="text-white text-xl">
									{state.data.database.connected ? "✓" : "✗"}
								</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
