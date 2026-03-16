import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type FilteredSearchState = {
  destination: string;
  dates: string;
  persons: string;
  toggles: Record<string, boolean>;
  accommodation: string;
  priceRange: [number, number];
};

const initialState: FilteredSearchState = {
  destination: "",
  dates: "",
  persons: "",
  toggles: {},
  accommodation: "",
  priceRange: [0, 500],
};

const filteredSearchSlice = createSlice({
  name: "filteredSearch",
  initialState,
  reducers: {
    setFilteredSearch(
      state,
      action: PayloadAction<Partial<FilteredSearchState>>,
    ) {
      return { ...state, ...action.payload };
    },
    clearFilteredSearch() {
      return initialState;
    },
  },
});

export const { setFilteredSearch, clearFilteredSearch } =
  filteredSearchSlice.actions;
export default filteredSearchSlice.reducer;
