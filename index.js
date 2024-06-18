import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import route from './routes/userRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URL, {
}).then(() => {
  console.log('Connected to DB successfully');
}).catch((error) => {
  console.error('Error connecting to the database:', error);
});

app.use('/api', route);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
