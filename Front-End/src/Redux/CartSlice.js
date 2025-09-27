import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  error: null,
  isLoading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        // If product already in cart, increase quantity
        state.cart = state.cart.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new product, add to cart with quantity 1
        state.cart.push({ ...action.payload, quantity: 1 });
      }

      state.isLoading = false;
      state.error = null;
    },

    addQuntity: (state, action) => {
      state.cart = state.cart.map((item) =>
        item._id === action.payload._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    },

    decreaseQuntity: (state, action) => {
      state.cart = state.cart
        .map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // remove item if quantity becomes 0
    },
    emptyCart: (state) => {
      state.cart = []; // Clear the cart
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id); // Remove item from cart
    },
  },
});

export const {
  addToCart,
  addQuntity,
  decreaseQuntity,
  removeFromCart,
  emptyCart,
} = cartSlice.actions;
export default cartSlice.reducer;
