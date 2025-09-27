import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthSlice from "./AuthSlice";
import PostSlice from "./postSlice";
import FrinendSlice from "./FriendSlice";
import socketSlice from "./socketSlice";
import rtnSlice from "./RTNSlice";
import cartSlice from "./CartSlice";
import wishSlice from "./WishlistSlice";
import AddressSlice from "./AddressSlice";
import orderSlice from "./orderSlice";

const rootReducer = combineReducers({
  auth: AuthSlice,
  post: PostSlice,
  cart: cartSlice,
  order: orderSlice,
  Address: AddressSlice,
  friend: FrinendSlice,
  wishList: wishSlice,
  socket: socketSlice,
  rtn: rtnSlice,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
