"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

interface LeafletMapProps {
	center?: LatLngExpression;
	zoom?: number;
	markers?: Array<{
		position: LatLngExpression;
		popup?: string;
	}>;
}

export default function LeafletMap({
	center = [51.505, -0.09],
	zoom = 13,
	markers,
}: LeafletMapProps) {
	return (
		<div className="overflow-hidden h-full w-full">
			<MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{markers?.map((marker) => (
					<Marker key={marker.position.toString()} position={marker.position}>
						{marker.popup && <Popup>{marker.popup}</Popup>}
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}
