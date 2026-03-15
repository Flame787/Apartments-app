import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Apartment } from "../types/apartment";

type FavoritesState = { favoriteApartments: Apartment[] };

// Load favorites from localStorage
let savedFavorites: Apartment[] = [];

const stored = localStorage.getItem("favoriteApartments");
if (stored) {
  try {
    savedFavorites = JSON.parse(stored);
  } catch (error) {
    console.error("Error parsing favorite apartments from localStorage:", error);
    savedFavorites = [];
  }
}

const initialState: FavoritesState = {
  favoriteApartments: savedFavorites,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<Apartment>) {
      const apt = action.payload;

      const exists = state.favoriteApartments.some((a) => a.id === apt.id);
      if (!exists) {
        state.favoriteApartments.push(apt);

        localStorage.setItem(
          "favoriteApartments",
          JSON.stringify(state.favoriteApartments)
        );
      }
    },

    removeFromFavorites(state, action: PayloadAction<number>) {
      const id = action.payload;

      state.favoriteApartments = state.favoriteApartments.filter(
        (a) => a.id !== id
      );

      localStorage.setItem(
        "favoriteApartments",
        JSON.stringify(state.favoriteApartments)
      );
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
