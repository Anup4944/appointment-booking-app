import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const advisorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter your fullname"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: [true, "Email already exist"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minlength: [6, "Password must be atleast 6 characters"],
      select: false,
    },
    category: {
      type: String,
      required: [true, "Please enter your category"],
    },

    availableDatesAndTime: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Availablity",
      },
    ],
    upComingBooking: [
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

advisorSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

advisorSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

advisorSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

advisorSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPaswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export const Advisor = mongoose.model("Advisor", advisorSchema);
