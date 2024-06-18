import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const createUser = async (req, res) => {
    try {
        const { email, fname, lname, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists, please use a different email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = new User({ email, fname, lname, password: hashedPassword });

        const saveData = await userData.save();
        const { fname: firstName, lname: lastName, email: userEmail } = saveData;

        res.status(200).json({ fname: firstName, lname: lastName, email: userEmail });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const userData = await User.find();
        if (!userData) {
            return res.status(404).json({ msg: "User data not found" });
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const userData = await User.findById(req.params.id);
        if (!userData) {
            return res.status(404).json({ msg: "User data not found" });
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const userData = await User.findById(req.params.id);
        if (!userData) {
            return res.status(404).json({ msg: "User data not found" });
        }
        const updatedData = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userData = await User.findById(req.params.id);
        if (!userData) {
            return res.status(404).json({ msg: "User data not found" });
        }
        const deletedData = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedData);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const logout = (req, res) => {
    res.status(200).json({ msg: "Logged out successfully" });
};

