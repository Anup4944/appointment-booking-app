import { Advisor } from "../models/Advisor.js";
import { asyncAwait } from "../middlewares/errorMiddleware.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/token.js";
import { Availablity } from "../models/Availability.js";

export const register = asyncAwait(async (req, res, next) => {
  const { fullName, email, password, category } = req.body;

  let advisor = await Advisor.findOne({ email });

  if (advisor) {
    return next(new ErrorHandler("User already exist with this email", 402));
  }

  advisor = await Advisor.create({
    fullName,
    email: email?.trim().toLowerCase(),
    password,
    category,
  });

  const token = await advisor.generateToken();

  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(201).cookie("token", token, options).json({
    success: true,
    message: "Your account has registered succesfully",
    advisor,
    token,
  });
});

export const login = asyncAwait(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter your email and password", 400));
  }

  const advisor = await Advisor.findOne({ email })
    .select("+password")
    .populate("availableDatesAndTime");

  if (!advisor) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isMatch = await advisor.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(advisor, 200, res);
});

export const logout = asyncAwait(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
    .json({
      success: true,
      message: "Logout success",
    });
});

export const openAvailiability = asyncAwait(async (req, res, next) => {
  const advisor = await Advisor.findById(req.body.id);

  const availableDate = await Availablity.find({ lawyer: req.body.id });

  const newAvailablityData = {
    availableDate: new Date(req.body.availableDate),
    time: req.body.time,
    lawyer: req.body.id,
  };

  const foundItem = availableDate.find(
    (item) =>
      item.time === req.body.time &&
      item.availableDate.toString() ===
        new Date(req.body.availableDate).toString()
  );

  if (foundItem) {
    return res.status(401).json({
      success: false,
      message: `Your availablity for ${new Date(req.body.availableDate)}  at ${
        req.body.time
      } has already been added. You cannot add same time availability twice`,
    });
  }

  if (advisor.availableDatesAndTime.includes(req.params.id)) {
    const index = advisor.availableDatesAndTime.indexOf(req.params.id);

    advisor.availableDatesAndTime.splice(index, 1);

    await advisor.save();
  }

  const availablity = await Availablity.create(newAvailablityData);

  advisor.availableDatesAndTime.unshift(availablity._id);

  await advisor.save();

  res.status(201).json({
    success: true,
    availablity,
    message: `Your availablity for ${availablity.availableDate}  at ${availablity.time} has been created`,
  });
});

// Get all advisorys
export const getAllAdvisor = asyncAwait(async (req, res) => {
  const allAdvisor = await Advisor.find().populate(
    "availableDatesAndTime upComingBooking"
  );

  if (allAdvisor.length < 0) {
    return res
      .status(400)
      .json({ success: false, message: "No advisor found" });
  }

  res.status(200).json({ status: true, message: "All advisors", allAdvisor });
});

// Get advisory by cookie when reloading the page in frontend
export const advisorProfile = asyncAwait(async (req, res) => {
  const advisor = await Advisor.findById(req.advisor._id).populate(
    "availableDatesAndTime"
  );

  res.status(200).json({ status: true, advisor });
});

export const getAllAvailability = asyncAwait(async (req, res) => {
  const allAvailability = await Availablity.find().populate("lawyer");

  if (allAvailability.length < 1) {
    return res.status(400).json({
      success: false,
      message: "No dates available at the moment",
    });
  }

  res.status(200).json({
    status: true,
    message: "Here are all available date and time of advisors",
    allAvailability,
  });
});

export const deleteAvailability = asyncAwait(async (req, res) => {
  const advisor = await Advisor.findById(req.advisor._id);

  const toBeDeleted = await Availablity.findById(req.params.id);

  if (advisor._id.toString() === toBeDeleted.lawyer.toString()) {
    if (advisor.availableDatesAndTime.includes(req.params.id)) {
      const index = advisor.availableDatesAndTime.indexOf(req.params.id);

      advisor.availableDatesAndTime.splice(index, 1);

      await advisor.save();
    }

    await Availablity.deleteOne({ _id: req.params.id });

    const allAvailability = await Availablity.find({ lawyer: req.body.id });

    res.status(200).json({
      status: true,
      allAvailability,
      message: `Your availability for ${toBeDeleted.availableDate} at ${toBeDeleted.time} has been deleted`,
    });
  } else {
    res.status(200).json({
      status: false,
      message: `You can only delete your availability`,
    });
  }
});
