import { summaryApi } from "@/Common";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticate: false,
  user: null,
  users: [],
  singleUser: null,
  isLoading: false,
};

///complete
export const register = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(summaryApi.signUp.url, formData, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.log(error.response.data);

      // If there is an error, return the response data or the message via rejectWithValue
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Custom payload in case of error
      } else {
        return rejectWithValue(error.message); // Fallback message if no response data
      }
    }
  }
);
export const verifyOtp = createAsyncThunk(
  "/auth/verifyOtp",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(summaryApi.verifyotp.url, formData, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.log(error.response.data);

      // If there is an error, return the response data or the message via rejectWithValue
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Custom payload in case of error
      } else {
        return rejectWithValue(error.message); // Fallback message if no response data
      }
    }
  }
);
export const resendotp = createAsyncThunk(
  "/auth/resendotp",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(summaryApi.resendOtp.url, formData, {
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

///complete
export const checkUser = createAsyncThunk(
  "/auth/userVerify",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(summaryApi.checkuser.url, {
        withCredentials: true,
      });
      return response.data;
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
///complete
export const singleuserDetail = createAsyncThunk(
  "/auth/singleuser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${summaryApi.singleUser.url}${userId}`,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      return response.data;
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
///imprement
export const deleteUser = createAsyncThunk(
  "/user/delete",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);

      const response = await axios.delete(`${summaryApi.deleteUser.url}${id}`, {
        withCredentials: true,
      });
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

///complete
export const loginwithPassword = createAsyncThunk(
  "/auth/login",
  async (fromData, { rejectWithValue }) => {
    try {
      const response = await axios.post(summaryApi.login.url, fromData, {
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
///complete
export const allUserAdmin = createAsyncThunk(
  "post/adminAlluser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(summaryApi.AdminUsers.url, {
        withCredentials: true, // ✅ Moved to config
      });
      console.log(response.data);

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
///imprement
export const updateUserAdmin = createAsyncThunk(
  "/user/updatebyadmin",
  async ({ formData, userId }, { rejectWithValue }) => {
    try {
      console.log(formData, userId);

      const response = await axios.post(
        `${summaryApi.updateUserByadmin.url}${userId}`,
        formData,
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

export const forgetpass = createAsyncThunk(
  "/auth/forgetpass",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(summaryApi.forgetpass.url, formData, {
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
export const resetPass = createAsyncThunk(
  "/auth/resetpass",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(summaryApi.resetPass.url, formData, {
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
export const changepass = createAsyncThunk(
  "/auth/changepass",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(summaryApi.changePass.url, formData, {
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

export const signupwithlink = createAsyncThunk(
  "/auth/linksignup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        summaryApi.magicSignUp.url,
        formData,

        {
          withCredentials: true,
        }
      );
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
export const profileUpdate = createAsyncThunk(
  "/auth/update",
  async (formData, { rejectWithValue }) => {
    try {
      console.log(formData);

      const response = await axios.post(
        `${summaryApi.updateUser.url}`,
        formData,
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
export const magiclogin = createAsyncThunk(
  "/auth/magiclogin",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        summaryApi.magiclogin.url,
        formData,

        {
          withCredentials: true,
        }
      );
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
export const google = createAsyncThunk(
  "auth/google",
  async (_, { rejectWithValue }) => {
    try {
      // Assuming your backend starts the OAuth flow
      const response = await axios.get(
        "http://localhost:3000/api/auth/google",
        {
          withCredentials: true, // Allow cookies if your backend sets them
        }
      );
      return response.data; // Return backend response to the store
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        summaryApi.logout.url,

        {
          withCredentials: true,
        }
      );
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
export const getUserById = createAsyncThunk(
  "/auth/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${summaryApi.getUserById.url}${id}`, {
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
export const followUser = createAsyncThunk(
  "/auth/followUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${summaryApi.followAUser.url}/${id}`, {
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

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyOtp.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(resendotp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendotp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resendotp.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(loginwithPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginwithPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticate = true;
        state.user = action.payload.data;
      })
      .addCase(loginwithPassword.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(checkUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticate = true;
        state.user = action.payload.data;
      })
      .addCase(checkUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticate = false;
        state.user = null;
      })
      .addCase(singleuserDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(singleuserDetail.fulfilled, (state, action) => {
        state.isLoading = false;

        state.singleUser = action.payload.data;
      })
      .addCase(singleuserDetail.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(forgetpass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgetpass.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgetpass.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(changepass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changepass.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changepass.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPass.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPass.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(signupwithlink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupwithlink.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signupwithlink.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(magiclogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(magiclogin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(magiclogin.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(google.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(google.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(google.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticate = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(profileUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(profileUpdate.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(profileUpdate.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleUser = action.payload.data;
      })
      .addCase(getUserById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(followUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleUser.follower = action.payload.follower;
        state.user.following = action.payload.following;
      })
      .addCase(followUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(allUserAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allUserAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
      })
      .addCase(allUserAdmin.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(updateUserAdmin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter(
          (item) => item._id !== action.payload.data._id
        );
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      });
  },
});

export default AuthSlice.reducer;
