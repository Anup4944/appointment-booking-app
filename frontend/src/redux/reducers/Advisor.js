import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const advisorReducer = createReducer(initialState, {
  LoginRequest: (state) => {
    state.isLoading = true;
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

  //   RegisterRequest: (state) => {
  //     state.isLoading = true;
  //   },
  //   RegisterSuccess: (state, action) => {
  //     state.isLoading = false;
  //     state.user = action.payload;
  //     state.isAuth = true;
  //   },
  //   RegisterFailure: (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //     state.isAuth = false;
  //   },

  //   LoadUserRequest: (state) => {
  //     state.isLoading = true;
  //   },
  //   LoadUserSuccess: (state, action) => {
  //     state.isLoading = false;
  //     state.user = action.payload;
  //     state.isAuth = true;
  //   },
  //   LoadUserFailure: (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //     state.isAuth = false;
  //   },
  //   logoutUserRequest: (state) => {
  //     state.isLoading = true;
  //   },
  //   logoutUserSuccess: (state) => {
  //     state.isLoading = false;
  //     state.user = null;
  //     state.isAuth = false;
  //   },
  //   logoutUserFailure: (state, action) => {
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
