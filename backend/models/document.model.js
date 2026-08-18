import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
        trim: true, 
    },
    fileName: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    fileSize: {
        type: Number,
    },
    mimeType: {
        type: String,
        default: 'application/pdf',
    },
    pageCount: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['processing', 'ready', 'failed'],
        default: 'processing',
    },
    processingError: {
        type: String,
        default: null,
    },
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);

export { Document };