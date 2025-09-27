import { summaryApi } from "@/Common";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
  totalAmount: null,
  orderDetails: null,
  isLoading: false,
  error: false,
};

export const createOrder = createAsyncThunk(
  "/order/create",
  async (formData, { rejectWithValue }) => {
    try {
      console.log(formData, "formData");

      const response = await axios.post(summaryApi.createOrder.url, formData, {
        withCredentials: true,
      });
      console.log(response.data, "response");
      return response.data;
    } catch (error) {
      console.log(error, "error");
      // If there is an error, return the response data or the message via rejectWithValue
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Custom payload in case of error
      } else {
        return rejectWithValue(error.message); // Fallback message if no response data
      }
    }
  }
);
export const getAllOrder = createAsyncThunk(
  "/order/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(summaryApi.getAllOrder.url, {
        withCredentials: true,
      });
      console.log(response.data, "response");
      return response.data;
    } catch (error) {
      console.log(error, "error");
      // If there is an error, return the response data or the message via rejectWithValue
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Custom payload in case of error
      } else {
        return rejectWithValue(error.message); // Fallback message if no response data
      }
    }
  }
);
export const myOrder = createAsyncThunk(
  "/order/myOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(summaryApi.myOrders.url, {
        withCredentials: true,
      });
      console.log(response.data, "response");
      return response.data;
    } catch (error) {
      console.log(error, "error");
      // If there is an error, return the response data or the message via rejectWithValue
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Custom payload in case of error
      } else {
        return rejectWithValue(error.message); // Fallback message if no response data
      }
    }
  }
);
export const singleorder = createAsyncThunk(
  "order/singleorder",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);

      const response = await axios.get(`${summaryApi.orderDetails.url}${id}`, {
        withCredentials: true, // ✅ Moved to config
      });

      return response.data;
    } catch (error) {
      console.log(error);

      // Return proper error messages
      return rejectWithValue(
        error.response?.data || error.message || "An error occurred"
      );
    }
  }
);
export const updatedOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      console.log(id, formData);

      const response = await axios.post(
        `${summaryApi.updateOrder.url}${id}`,
        formData,
        {
          withCredentials: true, // ✅ Moved to config
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);

      // Return proper error messages
      return rejectWithValue(
        error.response?.data || error.message || "An error occurred"
      );
    }
  }
);
export const deleteOrder = createAsyncThunk(
  "/order/delete",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);

      const response = await axios.delete(
        `${summaryApi.deleteOrder.url}${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      // If there is an error, return the response data or the message via rejectWithValue
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Custom payload in case of error
      } else {
        return rejectWithValue(error.message); // Fallback message if no response data
      }
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(getAllOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(myOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(myOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(myOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(singleorder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(singleorder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.order;
      })
      .addCase(singleorder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updatedOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatedOrder.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updatedOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = state.orders.filter(
          (item) => item._id !== action.payload.data._id
        );
        state.error = null;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      });
  },
});

export default orderSlice.reducer;
