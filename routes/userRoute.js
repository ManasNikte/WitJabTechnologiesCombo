import express from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, login, logout } from '../controller/userController.js';
import { createPortfolioItem, getAllPortfolioItems, getPortfolioItemById, updatePortfolioItem, deletePortfolioItem } from '../controller/portfolioController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.post("/createuser", createUser);
router.post("/login", login);

// Protected routes
router.get("/getallusers", authMiddleware, getAllUsers);
router.get("/getuserbyid/:id", authMiddleware, getUserById);
router.put("/updateuser/:id", authMiddleware, updateUser);
router.delete("/deleteuser/:id", authMiddleware, deleteUser);
router.post("/logout", authMiddleware, logout);

// Portfolio routes
router.get("/getallportfolio", getAllPortfolioItems);
router.get("/getportfoliobyid/:id", getPortfolioItemById);

// Protected routes
router.post("/addportfolio", authMiddleware, upload, createPortfolioItem);
router.put("/updateportfolio/:id", authMiddleware, upload, updatePortfolioItem);
router.delete("/deleteportfolio/:id", authMiddleware, deletePortfolioItem);

export default router;
