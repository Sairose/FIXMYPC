import { Booking } from "../models/BookingModel.js";
import { Notification } from "../models/NotificationModel.js";
import User from "../models/UserModel.js";

const createBooking = async ({ clientId, technicianId, message, scheduledDate }) => {
  const booking = await Booking.create({ clientId, technicianId, message, scheduledDate });

  await Notification.create({
    userId: technicianId,
    message: 'New booking request received',
    type: 'booking',
  });

  return booking;
};

//to fetch all booking assighned to that technician and to show data in logs
const getTechnicianBookings = async (technicianId) => {
  return await Booking.find({ technicianId }).populate('clientId', 'firstName lastName email');
};

//to fetch all booking assigned by that client and to show data in logs
const getClientBookings = async (clientId) => {
  return await Booking.find({ clientId }).populate('technicianId', 'firstName lastName email');
};

//to update status 
const respondBooking = async ({ bookingId, status }) => {
  const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });

  await Notification.create({
    userId: updatedBooking.clientId,
    message: `Your booking was ${status} by the technician.`,
    type: 'response',
  });

  return updatedBooking;
};


//to fetch all booking result to show in admin logs
const getAllBookings = async () => {
  return await Booking.find().populate('clientId technicianId');
};


const deleteBooking = async (bookingId) => {
  // You can add extra checks here like who can delete the booking, status, etc.

  // For example, only delete if booking status is pending or completed (not accepted) or add other rules
  const booking = await Booking.findById(bookingId);
  if (!booking) return false;

  // Example condition: only pending or completed bookings can be deleted
  if (!['pending', 'completed'].includes(booking.status)) {
    return false; // cannot delete accepted bookings (if you want)
  }

  await Booking.findByIdAndDelete(bookingId);
  return true;
};

export default {createBooking, getTechnicianBookings, getClientBookings, respondBooking, getAllBookings, deleteBooking};