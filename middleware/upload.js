import multer from 'multer';
import path from 'path';

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Setting destination for file upload');
    cb(null, 'uploads/'); // Uploads directory path
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    console.log('Generating unique filename:', uniqueSuffix + path.extname(file.originalname));
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename with original extension
  }
});

const upload = multer({ storage: storage }).single('file');

export default upload;
