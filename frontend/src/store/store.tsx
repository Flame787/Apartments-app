import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "./favoritesSlice";
import searchReducer from "./searchSlice";
import filteredSearchReducer from "./filteredSearchSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    search: searchReducer,
    filteredSearch: filteredSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // inferring RootState (state tree) type from the store itself - always correct, even if reducers are added/removed

export type AppDispatch = typeof store.dispatch; // inferring type of the function 'dispatch' from the store itself - always correct, even if middleware is added/removed
