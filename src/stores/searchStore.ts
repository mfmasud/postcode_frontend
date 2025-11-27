"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { SearchResponse } from "@/schemas/search.schema";

export interface SearchResponseWithMetadata {
  response: SearchResponse;
  createdAt: number;
  hidden: boolean;
}

type SearchStore = {
  items: SearchResponseWithMetadata[];

  add: (resp: SearchResponse) => void;
  remove: (searchID: number) => void;
  clear: () => void;
  hide: (searchID: number) => void;
  unhide: (searchID: number) => void;
  unhideAll: () => void;
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

          const newItem: SearchResponseWithMetadata = {
            response: resp,
            createdAt: Date.now(),
            hidden: false,
          };
          const newItems = [newItem, ...state.items];
          if (newItems.length > 20) {
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

      hide: (searchID: number) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.response.metadata.searchID === searchID
              ? { ...item, hidden: true }
              : item
          ),
        }));
      },

      unhide: (searchID: number) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.response.metadata.searchID === searchID
              ? { ...item, hidden: false }
              : item
          ),
        }));
      },

      unhideAll: () => {
        set((state) => ({
          items: state.items.map((item) => ({ ...item, hidden: false })),
        }));
      },
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
      version: 2,
      migrate: (persistedState: unknown, version) => {
        const state = persistedState as SearchStore;
        if (version < 2) {
          // Add 'hidden: false' to all elements in the existing data
          return {
            ...state,
            items: state.items.map((item) => ({
              ...item,
              hidden: item.hidden ?? false,
            })),
          };
        }
        return state;
      },
    }
  )
);
