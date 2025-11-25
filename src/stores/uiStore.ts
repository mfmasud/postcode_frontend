import { create } from "zustand";

interface UiState {
  showAllStops: boolean;
  toggleAllStops: () => void;
  showAllCrimes: boolean;
  toggleAllCrimes: () => void;
}

export const useUiStore = create<UiState>()((set) => ({
  showAllStops: false,
  toggleAllStops: () => set((state) => ({ showAllStops: !state.showAllStops })),
  showAllCrimes: false,
  toggleAllCrimes: () =>
    set((state) => ({ showAllCrimes: !state.showAllCrimes })),
}));
