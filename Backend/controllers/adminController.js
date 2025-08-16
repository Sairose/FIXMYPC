import adminService from '../services/adminService.js';

// USERS
const getAllUsers = async (req, res) => {
  const users = await adminService.getAllUsers();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await adminService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

const updateUser = async (req, res) => {
  const updated = await adminService.updateUser(req.params.id, req.body);
  res.json(updated);
};

const deleteUser = async (req, res) => {
  await adminService.deleteUser(req.params.id);
  res.json({ message: 'User deleted' });
};

// BOOKINGS
const getAllBookings = async (req, res) => {
  const bookings = await adminService.getAllBookings();
  res.json(bookings);
};

// REVIEWS
const getAllReviews = async (req, res) => {
  const reviews = await adminService.getAllReviews();
  res.json(reviews);
};

// STATS
const getStats = async (req, res) => {
  const stats = await adminService.getStats();
  res.json(stats);
};

export default {getAllUsers, getUserById, updateUser, deleteUser, getAllBookings, getAllReviews, getStats}
