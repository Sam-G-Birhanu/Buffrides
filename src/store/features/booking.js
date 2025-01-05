import { createSlice } from "@reduxjs/toolkit";

// Initial state for booking errors
const initialState = {
  errorMessage: "",
  isError: false,
  slotData: null,
};

// Create a slice for booking error
const bookingErrorSlice = createSlice({
  name: "bookingError",
  initialState,
  reducers: {
    // Action to set the error message
    setBookingError: (state, action) => {
      state.errorMessage = action.payload;
      state.isError = true;
    },
    // Action to clear the error message
    clearBookingError: (state) => {
      state.errorMessage = "";
      state.isError = false;
    },
    setSlotData: (state, action) => {
      state.slotData = action.payload;
    },
  },
});

export const bookingErr = (state) => state.booking.errorMessage;
export const slotData = (state) => state.booking.slotData;

export const { setBookingError, setSlotData, clearBookingError } =
  bookingErrorSlice.actions;

// Reducer to handle the state updates
export default bookingErrorSlice.reducer;
