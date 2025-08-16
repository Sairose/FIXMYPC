import express from 'express';
import adminController from '../controllers/adminController.js';



const router = express.Router();


// Users
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// Bookings
router.get('/bookings', adminController.getAllBookings);

// Reviews
router.get('/reviews', adminController.getAllReviews);

// Stats
router.get('/stats', adminController.getStats);

export default router;
