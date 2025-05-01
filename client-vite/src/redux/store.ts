import { configureStore } from "@reduxjs/toolkit";

// Slices
import authSlice from "@/redux/features/auth-slice";
// Query APIs
import authApi from "@/redux/services/auth-api";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware]),
});

// Setup interceptors after store is created
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
