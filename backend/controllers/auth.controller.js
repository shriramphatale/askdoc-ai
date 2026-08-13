import {User} from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

const signup = async (req, res) => {
    try {
        const {fullName, email, password} = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }
        if (password.length < 6) {
            return res.status(400).json({message: 'Password must be at least 6 characters long'});
        }
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
            return res.status(400).json({message: 'Invalid email format'});
        }
        if (await User.findOne({email})) {
            return res.status(400).json({message: 'Email already exists'});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({fullName, email, password: hashedPassword});

        if (newUser) {
            const savedUser = await newUser.save();
            
            generateToken(savedUser._id, res); // Generate token and set it in the cookie

            res.status(201).json({ 
                _id: savedUser._id, 
                fullName: savedUser.fullName, 
                email: savedUser.email 
            });
        } else {
            res.status(400).json({message: 'Invalid user data'});
        }
    } catch (error) {
        res.status(500).json({message: 'Error creating user', error: error.message});
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body; 
        if (!email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
            return res.status(400).json({message: 'Invalid email format'});
        }
        if (password.length < 6) {
            return res.status(400).json({message: 'Password must be at least 6 characters long'});
        }
       
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'Invalid Credentials'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({message: 'Invalid Credentials'});
        }

        generateToken(user._id, res); // Generate token and set it in the cookie

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });

    } catch (error) {
        res.status(500).json({message: 'Error logging in', error: error.message});
    }
}

const logout = (req, res) => {
    res.cookie('token', '', { maxAge: 0, httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({message: 'Logged out successfully'});
}

//implement update profile functionality

export {signup, login, logout};