import mongoose from "mongoose";

const usageSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        totalPdfUploads: {
            type: Number,
            default: 0,
        },

        monthlyPdfUploads: {
            type: Number,
            default: 0,
        },

        monthlyPdfPeriod: {
            type: String, // YYYY-MM
        },

        totalQuestions: {
            type: Number,
            default: 0,
        },

        dailyQuestions: {
            type: Number,
            default: 0,
        },

        dailyQuestionDate: {
            type: String, // YYYY-MM-DD
        },

        monthlyQuestions: {
            type: Number,
            default: 0,
        },

        monthlyQuestionPeriod: {
            type: String, // YYYY-MM
        },
    },
    { timestamps: true }
);

const Usage = mongoose.model("Usage", usageSchema);

export { Usage };