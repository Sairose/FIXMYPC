import express from 'express';
import bookingController from '../controllers/bookingController.js';
import { auth } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/', auth, bookingController.createBooking);
router.get('/technician', auth, bookingController.getTechnicianBookings);
router.get('/client', auth, bookingController.getClientBookings);
router.put('/:id', auth, bookingController.respondBooking);
router.get('/all', auth, bookingController.getAllBookings); // for admin
router.delete('/:id', auth, bookingController.deleteBooking);


export default router;
