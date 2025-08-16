// import multer from "multer";



// import fs from 'fs';


// const uploadFile = './uploads';

// if(!fs.existsSync(uploadFile)){
//     fs.mkdirSync(uploadFile);
// }

// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, uploadFile);
//     },
//     filename: (req, file, cb)=>{
//         cb(null, `${Date.now()}-${file.originalname}`);  //originalname is the name of the file that user uploaded
//     }
// });

// const upload = multer({storage});

// export {upload};

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
