"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { SearchResponse } from "@/schemas/search.schema";

export interface SearchResponseWithTimestamp {
  response: SearchResponse;
  createdAt: number;
}

type SearchStore = {
  items: SearchResponseWithTimestamp[];

  add: (resp: SearchResponse) => void;
  remove: (searchID: number) => void;
  clear: () => void;
};

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      items: [],

      add: (resp) => {
        set((state) => {
          // Skip adding if a duplicate searchID is found
          if (
            state.items.some(
              (item) =>
                item.response.metadata.searchID === resp.metadata.searchID
            )
          ) {
            return state; // Return current state without modification
          }

          const newItem: SearchResponseWithTimestamp = {
            response: resp,
            createdAt: Date.now(),
          };
          const newItems = [newItem, ...state.items];
          if (newItems.length > 8) {
            newItems.pop(); // Remove the oldest item
          }
          return { items: newItems };
        });
      },

      remove: (searchID: number) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.response.metadata.searchID !== searchID
          ),
        }));
      },

      clear: () => set({ items: [] }),
    }),
    {
      name: "postcode-searches", // localStorage key
      storage: createJSONStorage(() => localStorage, {
        reviver: (key, value) => {
          if (key === "items" && !Array.isArray(value)) {
            return [];
          }
          return value;
        },
      }),
      version: 1,
    }
  )
);
