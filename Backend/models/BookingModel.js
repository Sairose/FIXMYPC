// import mongoose from 'mongoose';


// const bookingSchema = new mongoose.Schema({
//   clientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user',
//     required: true,
//   },
//   technicianId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user',
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'accepted', 'declined', 'completed'],
//     default: 'pending',
//   },
//   message: String,
//   scheduledDate: Date
// }, { timestamps: true });

// const Booking = mongoose.model('Booking', bookingSchema);

// export {Booking};
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  technicianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'completed'],
    default: 'pending',
  },
  message: String,
  scheduledDate: Date
}, { timestamps: true });

// ✅ Prevent OverwriteModelError
export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
