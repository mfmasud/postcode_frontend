"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMapStore } from "@/stores/mapStore";
import { useRef, useEffect } from "react";
import type L from "leaflet";

export default function LeafletMap() {
	const setCenter = useMapStore((state) => state.setCenter);
	const setZoom = useMapStore((state) => state.setZoom);
	const center = useMapStore((state) => state.center);
	const zoom = useMapStore((state) => state.zoom);
	const markers = useMapStore((state) => state.markers);

	const mapRef = useRef<L.Map | null>(null);

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
					<Marker key={marker.position.toString()} position={marker.position}>
						{marker.popup && <Popup>{marker.popup}</Popup>}
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}
