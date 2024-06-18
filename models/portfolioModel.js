import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true },
  file: { type: String, required: true },
  colorful: { type: Boolean, default: false },
  visibility: { type: String, default: 'private' },
  weburl: { type: String, default: 'null' },
}, { timestamps: true });

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;
