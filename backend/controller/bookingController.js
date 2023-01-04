import { Advisor } from "../models/Advisor.js";
import { User } from "../models/User.js";
import { asyncAwait } from "../middlewares/errorMiddleware.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Availablity } from "../models/Availability.js";
import { Bookings } from "../models/Bookings.js";

// Save bookings
export const bookAppointment = asyncAwait(async (req, res, next) => {
  const { availableDate, time, lawyer, lawyerName, userName, userId } =
    req.body;

  // find advisor and user
  const advisor = await Advisor.findById(lawyer);

  const user = await User.findById(userId);

  // find availability
  const findAvailability = await Availablity.findOne({
    availableDate: new Date(availableDate),
    time: time,
    lawyer: lawyer,
  });

  if (!findAvailability) {
    return next(new ErrorHandler("No availability found", 404));
  }

  const bookings = {
    bookedDate: new Date(availableDate),
    time,
    lawyer,
    lawyerName,
    userName,
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

  if (allBookings.length <= 0) {
    return next(new ErrorHandler("No bookings found"));
  }

  res.status(200).json({ status: true, message: "All bookings", allBookings });
});

// Get bookings by user Id
export const getBookingById = asyncAwait(async (req, res, next) => {
  const id = req.params;

  const bookingById = await Bookings.find({
    id,
  });

  if (bookingById.length <= 0) {
    return next(new ErrorHandler("You have not made any bookings yet"));
  }

  res.status(200).json({ status: true, bookingById });
});

// Delete booking by Advisor Id

export const deleteBookingByAdvisor = asyncAwait(async (req, res, next) => {
  // advisor id
  const { id } = req.params;

  const advisor = await Advisor.findById(id);

  const user = await User.findById(req.body.userId);

  // find booking
  const booking = await Bookings.findOne({
    time: req.body.time,
    bookedDate: new Date(req.body.bookedDate),
    lawyer: id,
    user: req.body.userId,
  });

  if (!booking) {
    return next(new ErrorHandler("No booking found", 404));
  }

  // delete advisor's upcoming booking

  if (advisor.upComingBooking.includes(booking._id)) {
    const index = advisor.upComingBooking.indexOf(booking._id);

    advisor.upComingBooking.splice(index, 1);

    await advisor.save();
  }
  // delete client's upcoming booking

  if (user.futureBookings.includes(booking._id)) {
    const index = user.futureBookings.indexOf(booking._id);

    user.futureBookings.splice(index, 1);

    await user.save();
  }

  // re create availability
  const availability = await Availablity.create({
    time: req.body.time,
    availableDate: req.body.bookedDate,
    lawyer: id,
  });

  // add availability back
  advisor.availableDatesAndTime.unshift(availability._id);
  await advisor.save();

  // delete booking

  await Bookings.findOneAndRemove({
    time: req.body.time,
    bookedDate: new Date(req.body.bookedDate),
    lawyer: id,
    user: req.body.userId,
  });

  res.status(201).json({
    success: true,
    message: `Your booking for ${new Date(req.body.bookedDate)} at ${
      req.body.time
    } with client ${
      user.name
    } has been cancelled. Your availablity for ${new Date(
      req.body.bookedDate
    )}  at ${req.body.time} has been added back`,
  });
});

// Delete booking by Client Id
export const deleteBookingByClient = asyncAwait(async (req, res, next) => {
  // client Id
  const { id } = req.params;

  const advisor = await Advisor.findOne({ _id: req.body.lawyer });

  const user = await User.findById(id);

  const booking = await Bookings.findOne({
    time: req.body.time,
    bookedDate: new Date(req.body.bookedDate),
    lawyer: req.body.lawyer,
    user: id,
  });

  if (advisor.upComingBooking.includes(booking._id)) {
    const index = advisor.upComingBooking.indexOf(booking._id);

    advisor.upComingBooking.splice(index, 1);

    await advisor.save();
  }

  if (user.futureBookings.includes(booking._id)) {
    const index = user.futureBookings.indexOf(booking._id);

    user.futureBookings.splice(index, 1);

    await user.save();
  }

  const availability = await Availablity.create({
    time: req.body.time,
    availableDate: req.body.bookedDate,
    lawyer: req.body.lawyer,
  });

  advisor.availableDatesAndTime.unshift(availability._id);
  await advisor.save();

  await Bookings.findOneAndRemove({
    time: req.body.time,
    bookedDate: new Date(req.body.bookedDate),
    lawyer: req.body.lawyer,
    user: id,
  });

  res.status(201).json({
    success: true,
    message: `Your booking for ${new Date(req.body.bookedDate)} at ${
      req.body.time
    } with lawyer ${advisor.fullName} has been cancelled. `,
  });
});
