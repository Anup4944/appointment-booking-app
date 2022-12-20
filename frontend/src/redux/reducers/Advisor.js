import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const advisorReducer = createReducer(initialState, {
  LoginRequest: (state) => {
    state.isLoading = true;
    state.isAuth = false;
  },
  LoginSuccess: (state, action) => {
    state.isLoading = false;
    state.isAuth = true;
    state.message = action.payload.message;
    state.advisor = action.payload.advisor;
  },
  LoginFailure: (state, action) => {
    state.isLoading = false;
    state.isAuth = false;
    state.error = action.payload;
  },
  LoadUserRequest: (state) => {
    state.isLoading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isLoading = false;
    state.isAuth = true;
    state.advisor = action.payload.advisor;
  },
  LoadUserFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isAuth = false;
  },
  LogoutUserRequest: (state) => {
    state.isLoading = true;
  },
  LogoutUserSuccess: (state, action) => {
    state.isLoading = false;
    state.isAuth = false;
    state.message = action.payload.message;
    state.advisor = null;
  },
  LogoutUserFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isAuth = true;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMsg: (state) => {
    state.message = null;
  },
});

export const availabilityReducer = createReducer(initialState, {
  openAvailabilityRequest: (state) => {
    state.isLoading = true;
  },
  openAvailabilitySuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload.message;
    state.yourAvailability = action.payload.availablity;
  },
  openAvailabilityFailure: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  clearMsg: (state) => {
    state.message = null;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
