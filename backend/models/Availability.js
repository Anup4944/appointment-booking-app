import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    availableDate: {
      type: Date,
      required: [true, "Please enter your available date"],
    },
    time: {
      type: String,
      required: [true, "Please enter your available time"],
    },
    lawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Advisor",
    },
  },
  {
    timestamps: true,
  }
);

export const Availablity = mongoose.model("Availablity", availabilitySchema);
