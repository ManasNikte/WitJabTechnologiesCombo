import express from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, login, logout } from '../controller/userController.js';
import { createPortfolioItem, getAllPortfolioItems, getPortfolioItemById, updatePortfolioItem, deletePortfolioItem } from '../controller/portfolioController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';
import { newContactSubmission, getAllContacts } from '../controller/contactController.js';
import { addReview, getReviews, getReviewById, updateReviewById } from '../controller/reviewController.js';
import { subscribeNewsletter, getAllNewslettersSubscribers, unsubscribeNewsletter, GetSubscribeNewsletterById, GetSubscribeNewsletterByEmail } from '../controller/newsletterController.js';
const router = express.Router();

// Public routes
router.post("/createuser", createUser);
router.post("/login", login);
router.post("/contact", newContactSubmission);

// Create a new review
router.post('/addreview', addReview);

// Get all reviews
router.get('/getreviews', getReviews);

// Get all reviews
router.get('/getreview/:id', getReviewById );

// Update a review
router.put("/updatereview/:id", updateReviewById);

// Newsletter Routes
router.post("/newsletter", subscribeNewsletter);
router.get("/newsletterbyid/:id", GetSubscribeNewsletterById);
router.get("/newsletterbyemail/:email", GetSubscribeNewsletterByEmail);
router.delete("/newsletterunsubscribe/:id", unsubscribeNewsletter);
router.get("/newsletter", authMiddleware, getAllNewslettersSubscribers);


// Protected routes
router.get("/getallusers", authMiddleware, getAllUsers);
router.get("/getuserbyid/:id", authMiddleware, getUserById);
router.put("/updateuser/:id", authMiddleware, updateUser);
router.delete("/deleteuser/:id", authMiddleware, deleteUser);
router.post("/logout", authMiddleware, logout);
router.get("/contact", authMiddleware, getAllContacts);

// Portfolio routes
router.get("/getallportfolio", getAllPortfolioItems);
router.get("/getportfoliobyid/:id", getPortfolioItemById);

// Protected routes
router.post("/addportfolio", authMiddleware, upload, createPortfolioItem);
router.put("/updateportfolio/:id", authMiddleware, upload, updatePortfolioItem);
router.delete("/deleteportfolio/:id", authMiddleware, deletePortfolioItem);

export default router;
