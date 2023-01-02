import { configureStore } from "@reduxjs/toolkit";
import {
  advisorReducer,
  availabilityReducer,
  allAvailabilityReducer,
} from "./reducers/Advisor";
import { clientReducer } from "./reducers/Client";

const store = configureStore({
  reducer: {
    advisorReducer,
    availabilityReducer,
    clientReducer,
    allAvailabilityReducer,
  },
});

export default store;
