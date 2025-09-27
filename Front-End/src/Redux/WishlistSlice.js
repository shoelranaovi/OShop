import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
  error: null,
  isLoading: false,
};

export const wishSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addTowishlist: (state, action) => {
      state.wishlist = [...state.wishlist, action.payload];
      state.isLoading = false;
      state.error = null;
    },
    removeFromwishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item._id !== action.payload._id
      );
      state.isLoading = false;
      state.error = null;
    },
  },
});
export const { addTowishlist, removeFromwishlist } = wishSlice.actions;

export default wishSlice.reducer;
