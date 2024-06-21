import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  post: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  visibility: {
    type: String,
    required: true,
    trim: true,
    default: 'private',
  },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
