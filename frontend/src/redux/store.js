import { configureStore } from "@reduxjs/toolkit";
import {
  advisorReducer,
  availabilityReducer,
  allAvailabilityReducer,
} from "./reducers/Advisor";
import { clientReducer } from "./reducers/Client";
import { bookingReducer, bookingByIdReducer } from "./reducers/Bookings";

const store = configureStore({
  reducer: {
    advisorReducer,
    availabilityReducer,
    clientReducer,
    allAvailabilityReducer,
    bookingReducer,
    bookingByIdReducer,
  },
});

export default store;
