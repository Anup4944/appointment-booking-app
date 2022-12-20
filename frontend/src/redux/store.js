import { configureStore } from "@reduxjs/toolkit";
import { advisorReducer, availabilityReducer } from "./reducers/Advisor";

const store = configureStore({
  reducer: { advisorReducer, availabilityReducer },
});

export default store;
