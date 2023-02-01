import { configureStore } from "@reduxjs/toolkit";
import {
  advisorReducer,
  availabilityReducer,
  allAvailabilityReducer,
  recoverPasswordReducer,
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
    recoverPasswordReducer,
  },
});

export default store;

export const server = "https://backendbookingapp.onrender.com/api/v1";
