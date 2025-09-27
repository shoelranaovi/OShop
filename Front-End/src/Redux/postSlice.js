import { summaryApi } from "@/Common";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  AdminAllpost: [],
  productDetails: null,
  reviews: null,
  isLoading: false,
  error: null,
};
///imprement
export const addPost = createAsyncThunk(
  "/auth/register",
  async (fromData, { rejectWithValue }) => {
    console.log(fromData);

    try {
      const response = await axios.post(summaryApi.createPost.url, fromData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
///imprement
export const allPostAdmin = createAsyncThunk(
  "post/adminAllPost",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(summaryApi.adminAllpost.url, {
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
export const allproducts = createAsyncThunk(
  "post/allproducts",
  async (
    {
      keyword = "",
      category,
      price = [0, 200000],
      ratings = 0,
      currentPage = 1,
    },
    { rejectWithValue }
  ) => {
    try {
      console.log(keyword, category, price, ratings, currentPage);
      const response = await axios.get(
        `${summaryApi.allProducts.url}?keyword=${keyword}&category=${category}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&page=${currentPage}`,
        {
          withCredentials: true, // ✅ Moved to config
        }
      );
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
export const singlepost = createAsyncThunk(
  "post/post",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${summaryApi.singlePost.url}${id}`, {
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
///imprement
export const updatePost = createAsyncThunk(
  "/post/update",
  async ({ formData, productId }, { rejectWithValue }) => {
    try {
      console.log(formData, productId);

      const response = await axios.post(
        `${summaryApi.updatePost.url}${productId}`,
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

///imprement
export const deleteproduct = createAsyncThunk(
  "/product/delete",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);

      const response = await axios.delete(`${summaryApi.deletePost.url}${id}`, {
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
export const getReview = createAsyncThunk(
  "post/getReview",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);
      const response = await axios.get(`${summaryApi.getReview.url}${id}`, {
        withCredentials: true, // ✅ Moved to config
      });
      console.log(response.data.data);

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

export const createReview = createAsyncThunk(
  "/post/createReview",
  async (fromData, { rejectWithValue }) => {
    console.log(fromData);

    try {
      const response = await axios.post(summaryApi.createReview.url, fromData, {
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

export const deleteReview = createAsyncThunk(
  "/product/deleteReview",
  async ({ id, productId }, { rejectWithValue }) => {
    try {
      console.log(id, productId);

      const response = await axios.delete(
        `${summaryApi.deleteReview.url}/${id}?productId=${productId}`,
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

export const likeUnlike = createAsyncThunk(
  "post/likeUnlike",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${summaryApi.likeUnlike.url}${id}`, {
        withCredentials: true, // ✅ Moved to config
      });
      console.log(response.data.data);

      return { id, likes: response.data.data.like };
    } catch (error) {
      console.log(error);

      // Return proper error messages
      return rejectWithValue(
        error.response?.data || error.message || "An error occurred"
      );
    }
  }
);
export const commentAPost = createAsyncThunk(
  "post/comment",
  async ({ id, comment }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${summaryApi.commentPost.url}${id}`,
        comment,
        {
          withCredentials: true, // ✅ Moved to config
        }
      );

      return { id, comments: response.data.comments };
    } catch (error) {
      console.log(error);

      // Return proper error messages
      return rejectWithValue(
        error.response?.data || error.message || "An error occurred"
      );
    }
  }
);
export const replycomment = createAsyncThunk(
  "post/replycomment",
  async ({ id, comment }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${summaryApi.replyComment.url}${id}`,
        comment,
        {
          withCredentials: true, // ✅ Moved to config
        }
      );
      console.log(id, response.data.comments);

      return { id, comments: response.data.comments };
    } catch (error) {
      console.log(error);

      // Return proper error messages
      return rejectWithValue(
        error.response?.data || error.message || "An error occurred"
      );
    }
  }
);
export const likecomment = createAsyncThunk(
  "post/likeComment",
  async ({ postId, commentId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${summaryApi.addlikecommnet.url}${commentId}`,
        {},
        {
          withCredentials: true, // ✅ Moved to config
        }
      );

      console.log("Updated Likes:", response.data.likes);

      // ✅ Return Correct Data
      return {
        postId,
        commentId,
        likes: response.data.likes, // Updated likes array
      };
    } catch (error) {
      console.log("Like Comment Error:", error);

      return rejectWithValue(
        error.response?.data || error.message || "An error occurred"
      );
    }
  }
);
export const getbycategory = createAsyncThunk(
  "post/getbycategory",
  async (value, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${summaryApi.getPostbyCategory.url}?startIndex=0&limit=10&order=desc&author=&category=${value}&searchTerm=`,
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
export const addStory = createAsyncThunk(
  "/user/story",
  async (fromData, { rejectWithValue }) => {
    try {
      const response = await axios.post(summaryApi.addStory.url, fromData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
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
export const allStory = createAsyncThunk(
  "post/allstory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(summaryApi.getStory.url, {
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

export const PostSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(addPost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(updatePost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(allPostAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(allPostAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.AdminAllpost = action.payload.data;
        state.error = null;
      })
      .addCase(allPostAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(allproducts.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(allproducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.error = null;
      })
      .addCase(allproducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(singlepost.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(singlepost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
        state.error = null;
      })
      .addCase(singlepost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(deleteproduct.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(deleteproduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.AdminAllpost = state.AdminAllpost.filter(
          (item) => item._id !== action.payload.data._id
        );
        state.error = null;
      })
      .addCase(deleteproduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
        state.error = null;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(getReview.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.reviews;
        state.error = null;
      })
      .addCase(getReview.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = state.reviews.filter(
          (item) => item._id !== action.payload.data._id
        );
        state.error = null;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })

      .addCase(likeUnlike.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(likeUnlike.fulfilled, (state, action) => {
        state.Post = state.Post.map((post) =>
          post._id === action.payload.id
            ? { ...post, like: action.payload.likes }
            : post
        );
        state.isLoading = false;
      })
      .addCase(likeUnlike.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(commentAPost.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(commentAPost.fulfilled, (state, action) => {
        state.Post = state.Post.map((post) =>
          post._id === action.payload.id
            ? { ...post, comment: action.payload.comments }
            : post
        );
        state.isLoading = false; // ✅ Update likes in store
      })
      .addCase(commentAPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(replycomment.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(replycomment.fulfilled, (state, action) => {
        state.Post = state.Post.map((post) =>
          post._id === action.payload.id
            ? { ...post, comment: action.payload.comments }
            : post
        );
        state.isLoading = false; // ✅ Update likes in store
      })
      .addCase(replycomment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(likecomment.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(likecomment.fulfilled, (state, action) => {
        state.Post = state.Post.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                comment: post.comment.map((comment) =>
                  comment._id === action.payload.commentId
                    ? { ...comment, likes: action.payload.likes } // ✅ Update likes correctly
                    : comment
                ),
              }
            : post
        );

        state.isLoading = false; // ✅ Stop loading state
      })
      .addCase(likecomment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(addStory.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(addStory.fulfilled, (state, action) => {
        state.isLoading = false;

        if (Array.isArray(state.story)) {
          state.story = [action.payload.data, ...state.story];
        } else {
          // If it's not an array, directly set it as the new post array
          state.story = [action.payload.story];
        }
      })
      .addCase(addStory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      })
      .addCase(allStory.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(allStory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.story = action.payload.data;
        state.error = null;
      })
      .addCase(allStory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong"; // Store error message
      });
  },
});

export default PostSlice.reducer;
