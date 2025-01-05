import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import bookingErrorSlice from "./features/booking"

export const store = configureStore({
  reducer: {
    booking: bookingErrorSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }).concat(apiSlice.middleware),
});
