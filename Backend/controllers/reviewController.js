import reviewService from '../services/reviewService.js';
import { Review } from '../models/ReviewBooking.js';
import { analyzeSentiment } from '../services/mlService.js';
const createReview = async (req, res) => {
  try {
    const review = await reviewService.createReview({
      ...req.body,
      from: req.user.id,
      role: req.user.role
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// const getReviewsForUser = async (req, res) => {
//   try {
//     const reviews = await reviewService.getReviewsForUser(req.params.id);
//     res.json(reviews);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


const getReviewsForUser = async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsForUser(req.params.id);

    const enrichedReviews = reviews.map((review) => {
      return {
        ...review._doc,
        sentiment: analyzeSentiment(review.comment)
      };
    });

    res.json(enrichedReviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const submitReview = async (req, res) => {
  try {
    const { from, to, bookingId, role, rating, comment } = req.body;

    const review = new Review({
      from,
      to,
      bookingId,
      role,
      rating,
      comment
    });

    await review.save();
    await reviewService.calculateAverageRatings(); // Recalculate average after new review

    res.status(201).json({ message: 'Review submitted successfully', review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTechnicianReviews = async (req, res) => {
  try {
    const techId = req.params.techId;
    const reviews = await reviewService.getReviewsByTechnician(techId);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export default {createReview, getReviewsForUser, getAllReviews, submitReview, getTechnicianReviews};