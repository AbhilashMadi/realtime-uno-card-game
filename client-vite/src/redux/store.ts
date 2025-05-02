import { configureStore } from "@reduxjs/toolkit";

// Slices
import authSlice from "@/redux/features/auth-slice";
// Query APIs
import authApi from "@/redux/services/auth-api";
import roomApi from "@/redux/services/room-api";

const store = configureStore({
  reducer: {
    // slices
    [authSlice.name]: authSlice.reducer,
    // querys
    [authApi.reducerPath]: authApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, roomApi.middleware]),
});

// Setup interceptors after store is created
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
