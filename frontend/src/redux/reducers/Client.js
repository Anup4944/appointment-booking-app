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
  //   LogoutUserRequest: (state) => {
  //     state.isLoading = true;
  //   },
  //   LogoutUserSuccess: (state, action) => {
  //     state.isLoading = false;
  //     state.isAuth = false;
  //     state.message = action.payload.message;
  //     state.advisor = null;
  //   },
  //   LogoutUserFailure: (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //     state.isAuth = true;
  //   },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMsg: (state) => {
    state.message = null;
  },
});
