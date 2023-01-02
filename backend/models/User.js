import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    photo: String,
    email: String,
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    futureBookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookings",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
