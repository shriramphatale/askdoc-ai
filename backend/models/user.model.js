import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
    },
    profilePic: {
        type: String,
        default: '',
    },
    plan: {
        type: String,
        enum: ["free", "paid"],
        default: "free"
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);    

export { User };