import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: "Please provide a valid token." });
    }

    const token = authHeader.split(' ')[1];

    console.log('Token:', token); // Log the token received in the request
try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded token:', decoded); // Log decoded token for inspection
    req.user = decoded.id; // Assuming your JWT payload has an 'id' field
    next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        // Handle error responses accordingly
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: "Token expired, please login again." });
        }
        res.status(401).json({ msg: "Token is not valid" });
    }

};