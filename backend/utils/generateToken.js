import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

const generateToken = (userId, res) => {
    try {
        const jwtSecret = ENV.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }

        const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '7d' });

        res.cookie('token', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            sameSite: 'strict', // Prevents CSRF attacks
            secure: ENV.NODE_ENV === 'production', // Set to true in production
        });

        return token;
        
    } catch (error) {
        throw new Error('Error generating token');
    }
}


export { generateToken };