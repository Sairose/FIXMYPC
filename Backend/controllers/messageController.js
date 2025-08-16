import messageService from '../services/messageService.js';

const createMessage = async (req, res) => {
  try {
    const msg = await messageService.createMessage({
      senderId: req.user.id,
      ...req.body
    });
    res.status(201).json(msg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getChat = async (req, res) => {
  try {
    const messages = await messageService.getChat(req.params.bookingId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export default {createMessage, getChat};
