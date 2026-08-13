import express from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
// router.put('/update-profile', authMiddleware, updateProfile);   

//check if user is authenticated
router.get('/profile', authMiddleware, (req, res) => { 
    res.status(200).json( req.user );
})

export default router;