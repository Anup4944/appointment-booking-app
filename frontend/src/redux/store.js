import { configureStore } from "@reduxjs/toolkit";
import { advisorReducer } from "./reducers/Advisor";

const store = configureStore({
  reducer: { advisorReducer },
});

export default store;
