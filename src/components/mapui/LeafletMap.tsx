"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMapStore } from "@/stores/mapStore";
import { useRef, useEffect } from "react";

export default function LeafletMap() {
	const setMap = useMapStore((state) => state.setMap);
	const getMapPosition = useMapStore((state) => state.getMapPosition);
	const markers = useMapStore((state) => state.markers);

	const mapRef = useRef<L.Map | null>(null);

	const { center, zoom } = getMapPosition();

	useEffect(() => {
		if (mapRef.current) {
			setMap(mapRef.current);
		}
	}, [setMap]);

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
