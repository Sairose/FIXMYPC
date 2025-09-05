import { Booking } from "../models/BookingModel.js";
import { Review } from "../models/ReviewBooking.js";
import User from "../models/UserModel.js";


// USERS
const getAllUsers = async () => await User.find();
const getUserById = async (id) => await User.findById(id);
const updateUser = async (id, data) => await User.findByIdAndUpdate(id, data, { new: true });
const deleteUser = async (id) => await User.findByIdAndDelete(id);

// BOOKINGS
const getAllBookings = async () => await Booking.find().populate('clientId', 'firstName').populate('technicianId', 'firstName');


// REVIEWS
const getAllReviews = async () => await Review.find().populate('from to', 'firstName lastName');

// STATS
const getStats = async () => {
  const totalUsers = await User.countDocuments();
  const totalTechnicians = await User.countDocuments({ role: 'technician' });
  const totalClients = await User.countDocuments({ role: 'client' });
  const totalBookings = await Booking.countDocuments();
  return { totalUsers, totalTechnicians, totalClients, totalBookings };
};

export default {getAllUsers, getUserById, updateUser, deleteUser, getAllBookings, getAllReviews, getStats};


