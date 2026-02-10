import { Advisor } from "../models/Advisor.js";
import { User } from "../models/User.js";
import { asyncAwait } from "../middlewares/errorMiddleware.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Availablity } from "../models/Availability.js";
import { Bookings } from "../models/Bookings.js";
import { sendEmail } from "../utils/sendEmail.js";

// Save bookings
export const bookAppointment = asyncAwait(async (req, res, next) => {
  const {
    availableDate,
    time,
    lawyer,
    lawyerName,
    lawyerEmail,
    userEmail,
    userName,
    userId,
  } = req.body;

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
    lawyerEmail,
    userEmail,
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

  var message = `You have new booking with Mr. ${user.name} on ${newBooking.bookedDate} at ${newBooking.time} `;

  await sendEmail({
    email: advisor.email,
    subject: "New Booking",
    message,
  });

  var message = `You have booked an appointment with Mr. ${advisor.fullName} on ${newBooking.bookedDate} at ${newBooking.time}`;

  await sendEmail({
    email: user.email,
    subject: "Booking Confirmation Email",
    message,
  });

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
  const userId = req.params;

  const bookingById = await Bookings.find({
    user: userId.id,
  });

  if (bookingById.length <= 0) {
    return res
      .status(200)
      .json({ status: false, message: "No bookings available", bookingById });
  }

  res.status(200).json({ status: true, bookingById });
});

// Delete booking by Advisor Id

export const deleteBooking = asyncAwait(async (req, res, next) => {
  // booking id
  const { id } = req.params;

  const advisor = await Advisor.findById(req.body.lawyer);

  const user = await User.findById(req.body.userId);

  // find booking
  const booking = await Bookings.findById(id);

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
    lawyer: req.body.lawyer,
  });

  // add availability back
  advisor.availableDatesAndTime.unshift(availability._id);
  await advisor.save();

  // delete booking

  await Bookings.findByIdAndDelete(id);

  const ifClient = `Your booking for ${new Date(req.body.bookedDate)} at ${
    req.body.time
  } with advisor Mr ${advisor.fullName} has been cancelled.`;

  const ifAdvisor = `Your booking for ${new Date(req.body.bookedDate)} at ${
    req.body.time
  } with client ${user.name} has been cancelled. Availablity for ${new Date(
    req.body.bookedDate,
  )}  at ${req.body.time} has been added back`;

  await sendEmail({
    email: advisor.email,
    subject: "Booking deleted",
    message: ifAdvisor,
  });

  await sendEmail({
    email: user.email,
    subject: "Booking deleted",
    message: ifClient,
  });

  res.status(201).json({
    success: true,
    message: req.body.isClient
      ? `Your booking for ${new Date(req.body.bookedDate)} at ${
          req.body.time
        } with advisor Mr ${
          advisor.fullName
        } has been cancelled. Availablity for ${new Date(
          req.body.bookedDate,
        )}  at ${req.body.time} has been added back`
      : `Your booking for ${new Date(req.body.bookedDate)} at ${
          req.body.time
        } with client ${
          user.name
        } has been cancelled. Availablity for ${new Date(
          req.body.bookedDate,
        )}  at ${req.body.time} has been added back`,
  });
});

// Delete expired booking
export const deleteExpiredBooking = asyncAwait(async (req, res, next) => {
  const currentDate = new Date();

  // Find bookings where the booked date is in the past
  const expiredBookings = await Bookings.find({
    bookedDate: { $lt: currentDate },
  });

  if (expiredBookings.length > 0) {
    // Delete expired bookings
    await Bookings.deleteMany({
      _id: { $in: expiredBookings.map((booking) => booking._id) },
    });
  }
});
