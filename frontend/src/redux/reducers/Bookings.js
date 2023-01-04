import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const bookingReducer = createReducer(initialState, {
  BookingRequest: (state) => {
    state.isLoading = true;
  },
  BookingSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload.message;
  },
  BookingFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  DeleteBookingByAdvisorRequest: (state) => {
    state.isLoading = true;
  },
  DeleteBookingByAdvisorSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload.message;
  },
  DeleteBookingByAdvisorFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMsg: (state) => {
    state.message = null;
  },
});

export const bookingByIdReducer = createReducer(initialState, {
  BookingByIdRequest: (state) => {
    state.isLoading = true;
  },
  BookingByIdSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload.message;
    state.yourBookings = action.payload.bookingById;
  },
  BookingByIdFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMsg: (state) => {
    state.message = null;
  },
});
