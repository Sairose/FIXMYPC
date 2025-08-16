import express from 'express';
import messageController from '../controllers/messageController.js';
import { auth } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/', auth, messageController.createMessage);
router.get('/:bookingId', auth, messageController.getChat);

export default router;
