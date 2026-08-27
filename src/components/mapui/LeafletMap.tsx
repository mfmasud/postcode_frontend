"use client";

import "leaflet/dist/leaflet.css";
import {
	CircleMarker,
	MapContainer,
	Marker,
	Popup,
	TileLayer,
} from "react-leaflet";
import { useMapStore } from "@/stores/mapStore";
import { useSearchStore } from "@/stores/searchStore";
import { useUiStore } from "@/stores/uiStore";
import { useEffect, useMemo, useRef } from "react";

import type L from "leaflet";
import { Icon } from "leaflet";

const defaultIcon = new Icon({
	iconUrl: "/leaflet/images/marker-icon.png",
	shadowUrl: "/leaflet/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

export default function LeafletMap() {
	const setCenter = useMapStore((state) => state.setCenter);
	const setZoom = useMapStore((state) => state.setZoom);
	const center = useMapStore((state) => state.center);
	const zoom = useMapStore((state) => state.zoom);
	const markers = useMapStore((state) => state.markers);
	const searches = useSearchStore((state) => state.items);
	const showAllStops = useUiStore((state) => state.showAllStops);
	const stopVisibility = useUiStore((state) => state.stopVisibility);
	const showAllCrimes = useUiStore((state) => state.showAllCrimes);
	const crimeVisibility = useUiStore((state) => state.crimeVisibility);

	const mapRef = useRef<L.Map | null>(null);
	const stopMarkers = useMemo(
		() =>
			searches.flatMap((search) => {
				const searchID = search.response.metadata.searchID;
				const isVisible = stopVisibility[searchID] ?? showAllStops;

				if (search.hidden || !isVisible) return [];

				return (search.response.queryBusStops ?? []).flatMap((stop, index) => {
					if (!stop.Latitude || !stop.Longitude) return [];

					const latitude = Number(stop.Latitude);
					const longitude = Number(stop.Longitude);

					if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
						return [];
					}

					return [
						{
							key: `${searchID}-stop-${stop.ATCO_long}-${index}`,
							position: [latitude, longitude] as [number, number],
							popup:
								[stop.CommonName, stop.Street].filter(Boolean).join(", ") ||
								stop.ATCO_long,
						},
					];
				});
			}),
		[searches, showAllStops, stopVisibility],
	);
	const crimeMarkers = useMemo(
		() =>
			searches.flatMap((search) => {
				const searchID = search.response.metadata.searchID;
				const isVisible = crimeVisibility[searchID] ?? showAllCrimes;

				if (search.hidden || !isVisible) return [];

				return (search.response.queryCrimes ?? []).flatMap((crime, index) => {
					if (
						!Number.isFinite(crime.latitude) ||
						!Number.isFinite(crime.longitude)
					) {
						return [];
					}

					return [
						{
							key: `${searchID}-crime-${crime.crimeID ?? "unknown"}-${index}`,
							position: [crime.latitude, crime.longitude] as [number, number],
							popup: [crime.crime_category ?? "Crime", crime.crime_date]
								.filter(Boolean)
								.join(", "),
						},
					];
				});
			}),
		[crimeVisibility, searches, showAllCrimes],
	);

	useEffect(() => {
		const map = mapRef.current;
		if (!map) return;

		const handleMoveEnd = () => setCenter(map.getCenter());
		const handleZoomEnd = () => setZoom(map.getZoom());

		map.on("moveend", handleMoveEnd);
		map.on("zoomend", handleZoomEnd);

		return () => {
			map.off("moveend", handleMoveEnd);
			map.off("zoomend", handleZoomEnd);
		};
	}, [setCenter, setZoom]);

	useEffect(() => {
		if (mapRef.current && center) {
			mapRef.current.setView(center, mapRef.current.getZoom());
		}
	}, [center]);

	useEffect(() => {
		if (mapRef.current && zoom) {
			mapRef.current.setZoom(zoom);
		}
	}, [zoom]);

	return (
		<div className="h-full w-full">
			<MapContainer
				center={center}
				zoom={zoom}
				scrollWheelZoom={true}
				ref={mapRef}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{markers.map((marker) => (
					<Marker
						key={marker.position.toString()}
						icon={defaultIcon}
						position={marker.position}
					>
						{marker.popup && <Popup>{marker.popup}</Popup>}
					</Marker>
				))}
				{stopMarkers.map((marker) => (
					<CircleMarker
						key={marker.key}
						center={marker.position}
						pathOptions={{ color: "#2563eb" }}
						radius={6}
					>
						<Popup>{marker.popup}</Popup>
					</CircleMarker>
				))}
				{crimeMarkers.map((marker) => (
					<CircleMarker
						key={marker.key}
						center={marker.position}
						pathOptions={{ color: "#dc2626" }}
						radius={5}
					>
						<Popup>{marker.popup}</Popup>
					</CircleMarker>
				))}
			</MapContainer>
		</div>
	);
}
