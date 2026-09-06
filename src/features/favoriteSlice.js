import { createSlice } from "@reduxjs/toolkit";

function getFavoritesKey() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.email ? `favorites:${user.email.toLowerCase()}` : "favorites:guest";
  } catch {
    return "favorites:guest";
  }
}

function readFavorites() {
  try {
    return JSON.parse(localStorage.getItem(getFavoritesKey())) || [];
  } catch {
    return [];
  }
}

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: readFavorites(),
  reducers: {
    loadFavorites: () => readFavorites(),
    clearFavorites: () => [],
    addFavorite: (state, action) => {
      const exists = state.find(
        (laptop) => laptop.id === action.payload.id
      );

      if (!exists) {
        state.push(action.payload);
        localStorage.setItem(getFavoritesKey(), JSON.stringify(state));
      }
    },
    removeFavorite: (state, action) => {
      const updated = state.filter(
        (laptop) => laptop.id !== action.payload
      );
      localStorage.setItem(getFavoritesKey(), JSON.stringify(updated));
      return updated;
    }
  }
});

export const { addFavorite, removeFavorite, loadFavorites, clearFavorites } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
