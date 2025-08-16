import express from 'express';
import reviewController from '../controllers/reviewController.js';
import { auth } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/', auth, reviewController.createReview);
router.get('/user/:id', auth, reviewController.getReviewsForUser);
router.get('/all', auth, reviewController.getAllReviews); // Admin route

router.post('/submit', reviewController.submitReview);
router.get('/technician/:techId', reviewController.getTechnicianReviews);

export default router;
