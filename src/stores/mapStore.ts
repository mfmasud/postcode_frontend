import { create } from "zustand";
import type { LatLngExpression } from "leaflet";
import { persist } from "zustand/middleware";

type MapState = {
  center: LatLngExpression;
  zoom: number;
  setCenter: (c: LatLngExpression) => void;
  setZoom: (z: number) => void;
  markers: Array<{
    position: LatLngExpression;
    popup?: string;
  }>;
  setMarkers: (
    m: Array<{ position: LatLngExpression; popup?: string }>
  ) => void;
};

export const useMapStore = create<MapState>()(
  persist(
    (set) => ({
      center: [51.505, -0.09],
      zoom: 13,
      markers: [],
      setCenter: (c) => {
        set({ center: c });
      },
      setZoom: (z) => {
        set({ zoom: z });
      },
      setMarkers: (m) => set({ markers: m }),
    }),
    {
      name: "map-storage",
      partialize: (state) => ({ center: state.center, zoom: state.zoom }),
    }
  )
);
