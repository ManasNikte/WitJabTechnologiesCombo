import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import route from './routes/userRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import sslify from 'express-sslify';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

dotenv.config();

const app = express();

// Force HTTPS redirect in production
if (process.env.NODE_ENV === 'production') {
  app.use(sslify.HTTPS({ trustProtoHeader: true }));
}

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Database connection
mongoose.connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log('Connected to DB successfully');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// API routes
app.use('/api', route);

// Catch-all handler for serving the React app's index.html file for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
