import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingInfo: {},
  error: null,
  isLoading: false,
};

export const AddressSlice = createSlice({
  name: "Address",
  initialState,
  reducers: {
    addAddress: (state, action) => {
      state.shippingInfo = action.payload;

      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { addAddress } = AddressSlice.actions;
export default AddressSlice.reducer;
