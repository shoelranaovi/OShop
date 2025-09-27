import { summaryApi } from "@/Common";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  suggestFrinend: [],
  pendingReq: [],
  friend: [],
  isLoading: false,
};

export const suggestUser = createAsyncThunk(
  "/user/getSuggestUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(summaryApi.getSuggestFriend.url, {
        withCredentials: true,
      });
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
export const sendFriendreq = createAsyncThunk(
  "/user/sendFriendreq",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${summaryApi.sendFriendreq.url}${id}`, {
        withCredentials: true,
      });
      console.log(response.data, id);

      return { data: response.data, id };
    } catch (error) {
      console.log(error);

      // If there is an error, return the response data or the message via rejectWithValue
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Custom payload in case of error
      } else {
        return rejectWithValue(error.message); // Fallback message if no response data
      }
    }
  }
);
export const getpendingFriend = createAsyncThunk(
  "/user/getpendingFriend",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(summaryApi.getpendingfriend.url, {
        withCredentials: true,
      });

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
export const cencelreq = createAsyncThunk(
  "/user/cencelreq",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${summaryApi.cencelreq.url}${id}`, {
        withCredentials: true,
      });
      console.log(response.data, id);

      return { data: response.data, id };
    } catch (error) {
      console.log(error);

      // If there is an error, return the response data or the message via rejectWithValue
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Custom payload in case of error
      } else {
        return rejectWithValue(error.message); // Fallback message if no response data
      }
    }
  }
);
export const acceptreq = createAsyncThunk(
  "/user/accptreq",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${summaryApi.acceptreq.url}${id}`, {
        withCredentials: true,
      });
      console.log(response.data, id);

      return { data: response.data, id };
    } catch (error) {
      console.log(error);

      // If there is an error, return the response data or the message via rejectWithValue
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Custom payload in case of error
      } else {
        return rejectWithValue(error.message); // Fallback message if no response data
      }
    }
  }
);

export const FrinendSlice = createSlice({
  name: "Frinend",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(suggestUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(suggestUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suggestFrinend = action.payload.data;
      })
      .addCase(suggestUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(sendFriendreq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendFriendreq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suggestFrinend = state.suggestFrinend.filter(
          (friend) => friend._id !== action.payload.id
        );
      })
      .addCase(sendFriendreq.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getpendingFriend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getpendingFriend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingReq = action.payload.data;
      })
      .addCase(getpendingFriend.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(cencelreq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cencelreq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingReq = state.pendingReq.filter(
          (friend) => friend._id !== action.payload.id
        );
      })
      .addCase(cencelreq.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(acceptreq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(acceptreq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingReq = state.pendingReq.filter(
          (friend) => friend._id !== action.payload.id
        );
      })
      .addCase(acceptreq.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default FrinendSlice.reducer;
