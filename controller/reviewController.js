import Review from '../models/reviewModel.js';
import nodemailer from 'nodemailer';

// Function to send email notification
export const sendEmailNotification = async (name, stars, post, company, text) => {
  try {
    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'manas.nikte@irrecordings.com',
        pass: 'Mcn78554714@',
      },
    });

    // Define email content using HTML for better formatting
    let htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #333;">New Review Submitted</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Stars:</strong> ${stars}</p>
          <p><strong>Post:</strong> ${post}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Review:</strong></p>
          <p>${text}</p>
          <p style="margin-top: 20px; color: #888;">This email was sent from WitJab Technologies.</p>
        </body>
      </html>
    `;

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'WitJab Technologies <manas.nikte@irrecordings.com>', // sender address
      to: 'manas.nikte@gmail.com', // list of receivers (can be your own email or multiple emails)
      subject: 'New Review Submitted', // Subject line
      html: htmlContent, // html body
    });

    console.log('Email notification sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
};

// Create a new review
export const addReview = async (req, res) => {
  try {
    const { stars, name, post, company, text } = req.body;
    const review = new Review({ stars, name, post, company, text });
    const savedReview = await review.save();

    // Send email notification after saving review data
    await sendEmailNotification(name, stars, post, company, text);

    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

// Get all reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

// Get review by ID
export const getReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    console.error('Error fetching review by ID:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

// Update a review by ID
export const updateReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { stars, name, post, company, text, visibility } = req.body;

    // Find the review by ID and update it
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { stars, name, post, company, text, visibility },
      { new: true } // To return the updated review
    );

    if (!updatedReview) {
      return res.status(404).json({ msg: 'Review not found' });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};
