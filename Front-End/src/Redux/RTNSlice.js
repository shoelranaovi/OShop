import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  
notification:[],
  onlineUser:[],
  unreadCount:0 ,

};

export const rtnSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setLikeNotification: (state, action) => {
      state.notification = [action.payload, ...state.notification];
      state.unreadCount += 1
    },
    setNotifications: (state, action) => {
      state.notification = action.payload
    },
    setOnlineUser: (state, action) => {
        state.onlineUser = action.payload;
      },
       markNotificationsAsRead: (state) => {
      state.unreadCount = 0; // ইউজার দেখলে সংখ্যা ০ হবে
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLikeNotification,setOnlineUser,setNotifications,markNotificationsAsRead } = rtnSlice.actions;

export default rtnSlice.reducer;