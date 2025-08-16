import bookingService from '../services/bookingService.js';

const createBooking = async (req, res) => {
  try {
    const booking = await bookingService.createBooking({
      clientId: req.user.id,
      ...req.body
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getTechnicianBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getTechnicianBookings(req.user.id);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getClientBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getClientBookings(req.user.id);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const respondBooking = async (req, res) => {
  try {
    const booking = await bookingService.respondBooking({
      bookingId: req.params.id,
      status: req.body.status
    });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    // Assuming you want only the client or admin to delete, you can check req.user.id here if needed
    
    const deleted = await bookingService.deleteBooking(bookingId);
    if (!deleted) {
      return res.status(404).json({ message: 'Booking not found or cannot be deleted' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export default {createBooking, getTechnicianBookings, getClientBookings, respondBooking, getAllBookings, deleteBooking}
