import { configureStore } from "@reduxjs/toolkit";
import {
  advisorReducer,
  availabilityReducer,
  allAvailabilityReducer,
} from "./reducers/Advisor";
import { clientReducer } from "./reducers/Client";
import { bookingReducer } from "./reducers/Bookings";

const store = configureStore({
  reducer: {
    advisorReducer,
    availabilityReducer,
    clientReducer,
    allAvailabilityReducer,
    bookingReducer,
  },
});

export default store;
