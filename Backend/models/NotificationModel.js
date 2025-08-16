import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: String,
  type: {
    type: String,
    enum: ['booking', 'response', 'chat'],
    default: 'booking',
  },
  read: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
export {Notification};
