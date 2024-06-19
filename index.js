import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import route from './routes/userRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'express-sslify';

dotenv.config();

const app = express();

// Force HTTPS redirect
if (process.env.NODE_ENV === 'production') {
  const { https: sslify } = pkg;
  app.use(sslify({ trustProtoHeader: true }));
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

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to DB successfully');
}).catch((error) => {
  console.error('Error connecting to the database:', error);
});

app.use('/api', route);

// Catch-all handler to serve the React app's index.html file for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
