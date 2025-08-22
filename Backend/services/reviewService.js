import { Review } from "../models/ReviewBooking.js";
import { Booking } from '../models/BookingModel.js'
import  User  from '../models/UserModel.js';

const createReview = async (data) => {
    const { from, to, bookingId, role, rating, comment } = data;

    // Ensure booking is completed (not just accepted)
    const booking = await Booking.findById(bookingId);
    if (!booking || booking.status !== 'completed') {
        throw new Error('You can only review after a completed booking.');
    }

    // Prevent duplicate reviews
    const existing = await Review.findOne({ from, to, bookingId });
    if (existing) {
        throw new Error('You have already reviewed this booking.');
    }

    return await Review.create({ from, to, bookingId, role, rating, comment });
};

// const getReviewsForUser = async (userId) => {
//     return await Review.find({ to: userId }).populate('from', 'firstName lastName role');
// };

const getReviewsForUser = async (userId) => {
  return await Review.find({ to: userId })
    .populate({
      path: 'from',
      select: 'firstName lastName role',
      strictPopulate: false // optional safeguard in case of schema mismatch
    });
};


const getAllReviews = async () => {
    return await Review.find().populate('from to', 'firstName lastName role');
};

const calculateAverageRatings = async () => {
  const ratings = await Review.aggregate([
    {
      $group: {
        _id: '$to', // group by reviewed user (technician)
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 }
      }
    }
  ]);

  for (const rating of ratings) {
    await User.findByIdAndUpdate(rating._id, {
      averageRating: rating.averageRating,
      reviewCount: rating.reviewCount
    });
  }
};

const getReviewsByTechnician = async (techId) => {
  return await Review.find({ to: techId }).populate('from', 'firstName lastName');
};

export default { createReview, getReviewsForUser, getAllReviews, calculateAverageRatings, getReviewsByTechnician };