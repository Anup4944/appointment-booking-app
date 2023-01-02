import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const clientReducer = createReducer(initialState, {
  LoadClientRequest: (state) => {
    state.isLoading = true;
  },
  LoadClientSuccess: (state, action) => {
    state.isLoading = false;
    state.isAuthenticated = true;
    state.client = action.payload;
  },
  LoadClientFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  LogoutClientRequest: (state) => {
    state.isLoading = true;
  },
  LogoutClientSuccess: (state) => {
    state.isLoading = false;
    state.isAuthenticated = false;
    state.client = null;
  },
  LogoutClientFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMsg: (state) => {
    state.message = null;
  },
});
