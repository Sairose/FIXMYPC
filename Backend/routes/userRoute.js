import express from 'express';
import userController from '../controllers/userController.js';
import { auth } from '../middlewares/authMiddleware.js';
import { upload } from '../config/uploadImage.js';

const router = express.Router();


//login-register-updateProfile
router.post('/signup', upload.single('file'),  userController.signup); // 'file' is the name of the file input in the form

router.post('/login', userController.login);
router.put('/update-profile', auth, userController.updateProfile);
router.get('/profile', auth, userController.getProfile);

//fetching technicians
router.get('/technicians', auth, userController.getTechnicians);




export default router;