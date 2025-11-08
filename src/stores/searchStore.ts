"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { SearchResponse } from "@/schemas/search.schema";

type SearchStore = {
  items: Record<string, SearchResponse>;

  add: (resp: SearchResponse) => void;
  clear: () => void;
};

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      items: {},

      add: (resp) => {
        const id = resp.metadata.searchID;
        set((state) => {
          const items = { ...state.items, [id.toString()]: resp };
          return { items };
        });
      },

      clear: () => set({ items: {} }),
    }),
    {
      name: "postcode-searches", // localStorage key
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
