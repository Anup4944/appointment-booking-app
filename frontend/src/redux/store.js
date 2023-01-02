import { configureStore } from "@reduxjs/toolkit";
import { advisorReducer, availabilityReducer } from "./reducers/Advisor";
import { clientReducer } from "./reducers/Client";

const store = configureStore({
  reducer: { advisorReducer, availabilityReducer, clientReducer },
});

export default store;
