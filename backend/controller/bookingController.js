import { Advisor } from "../models/Advisor.js";
import { User } from "../models/User.js";
import { asyncAwait } from "../middlewares/errorMiddleware.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Availablity } from "../models/Availability.js";
import { Bookings } from "../models/Bookings.js";

// Save bookings
export const bookAppointment = asyncAwait(async (req, res, next) => {
  const { availableDate, time, lawyer, userId } = req.body;

  // find advisor and user
  const advisor = await Advisor.findById(lawyer);
  const user = await User.findById(userId);

  // find availability
  const findAvailability = await Availablity.findOne({
    availableDate: new Date(availableDate),
    time: time,
    lawyer: lawyer.toString(),
  });

  if (!findAvailability) {
    return next(new ErrorHandler("No availability found", 404));
  }

  const bookings = {
    bookedDate: new Date(availableDate),
    time,
    lawyer,
    user,
  };

  // create new booking
  const newBooking = await Bookings.create(bookings);

  // add booking on advisors upComing list

  advisor.upComingBooking.unshift(newBooking._id);
  await advisor.save();

  user.futureBookings.unshift(newBooking._id);
  await user.save();

  // remove booked availability

  await Availablity.findOneAndRemove({
    lawyer: advisor._id.toString(),
  });

  // remove availability from advisor's availableDatesAndTime
  if (advisor.availableDatesAndTime.includes(findAvailability._id)) {
    const index = advisor.availableDatesAndTime.indexOf(findAvailability._id);

    advisor.availableDatesAndTime.splice(index, 1);

    await advisor.save();
  }

  res.status(201).json({
    success: true,
    message: `You have booked an appointment with Mr. ${advisor.fullName} on ${newBooking.bookedDate} at ${newBooking.time}`,
  });
});

// Get all bookings

export const allBookings = asyncAwait(async (req, res, next) => {
  const allBookings = await Bookings.find().populate("lawyer user");

  if (allBookings.length < 0) {
    return res
      .status(400)
      .json({ success: false, message: "No bookings found" });
  }

  res.status(200).json({ status: true, message: "All bookings", allBookings });
});
