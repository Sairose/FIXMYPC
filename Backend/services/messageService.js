import {Message} from '../models/MessageModel.js';

const createMessage = async ({ senderId, receiverId, message, bookingId }) => {
  return await Message.create({ senderId, receiverId, message, bookingId });
};

const getChat = async (bookingId) => {
  return await Message.find({ bookingId })
    .sort({ createdAt: 1 }) // Ensures messages are in order
    .populate('senderId', 'firstName lastName role')
    .populate('receiverId', 'firstName lastName role');
};
export default {createMessage, getChat};
