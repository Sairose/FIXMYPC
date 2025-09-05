import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'tech-hub', // Change to your folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: (req, file) => {
      const timestamp = Date.now();
      const uniqueSuffix = `${timestamp}-${file.originalname.split('.')[0]}`;
      return `profile-${uniqueSuffix}`;
    },
  },
});

export const upload = multer({ storage });
