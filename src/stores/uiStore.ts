import { create } from "zustand";

interface UiState {
  showAllStops: boolean;
  stopVisibility: Record<number, boolean>;
  toggleAllStops: () => void;
  toggleStops: (searchID: number) => void;
  showAllCrimes: boolean;
  crimeVisibility: Record<number, boolean>;
  toggleAllCrimes: () => void;
  toggleCrimes: (searchID: number) => void;
}

export const useUiStore = create<UiState>()((set) => ({
  showAllStops: false,
  stopVisibility: {},
  toggleAllStops: () =>
    set((state) => ({
      showAllStops: !state.showAllStops,
      stopVisibility: {},
    })),
  toggleStops: (searchID) =>
    set((state) => ({
      stopVisibility: {
        ...state.stopVisibility,
        [searchID]: !(
          state.stopVisibility[searchID] ?? state.showAllStops
        ),
      },
    })),
  showAllCrimes: false,
  crimeVisibility: {},
  toggleAllCrimes: () =>
    set((state) => ({
      showAllCrimes: !state.showAllCrimes,
      crimeVisibility: {},
    })),
  toggleCrimes: (searchID) =>
    set((state) => ({
      crimeVisibility: {
        ...state.crimeVisibility,
        [searchID]: !(
          state.crimeVisibility[searchID] ?? state.showAllCrimes
        ),
      },
    })),
}));
