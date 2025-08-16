import mongoose from "mongoose";
import User from './UserModel.js';

const reviewSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    role: {
        type: String,
        enum: ['client', 'technician'], // who gave the review
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: String
},
    { timestamps: true },
)

const Review =  mongoose.model('Review', reviewSchema);

export {Review}