import { create } from "zustand";
import type { LatLngExpression } from "leaflet";
import type L from "leaflet";

type MapState = {
  map: L.Map | null;
  setMap: (m: L.Map) => void;
  setCenter: (c: LatLngExpression) => void;
  setZoom: (z: number) => void;
  getMapPosition: () => { center: LatLngExpression; zoom: number };
  markers: Array<{
    position: LatLngExpression;
    popup?: string;
  }>;
  setMarkers: (
    m: Array<{ position: LatLngExpression; popup?: string }>
  ) => void;
};

export const useMapStore = create<MapState>((set, get) => ({
  map: null,
  markers: [],
  setMap: (m) => set({ map: m }),
  setCenter: (c) => {
    const map = get().map;
    if (map) {
      map.setView(c, map.getZoom());
    }
  },
  setZoom: (z) => {
    const map = get().map;
    if (map) {
      map.setZoom(z);
    }
  },
  getMapPosition: () => {
    const map = get().map;
    if (map) {
      return { center: map.getCenter(), zoom: map.getZoom() };
    }
    return { center: [51.505, -0.09], zoom: 13 }; // Default values
  },
  setMarkers: (m) => set({ markers: m }),
}));
