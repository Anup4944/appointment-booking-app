import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookedDate: {
      type: Date,
      required: [true, "Please enter your booking date"],
    },
    time: {
      type: String,
      required: [true, "Please enter your available time"],
    },
    lawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Advisor",
    },
    lawyerName: {
      type: String,
      required: [true, "Please enter your advisor name"],
    },
    lawyerEmail: {
      type: String,
      required: [true, "Please enter your advisor email"],
    },
    userEmail: {
      type: String,
      required: [true, "Please enter your user email"],
    },
    userName: {
      type: String,
      required: [true, "Please enter your username"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Bookings = mongoose.model("Bookings", bookingSchema);
