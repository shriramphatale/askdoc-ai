import { Usage } from '../models/usage.model.js'

// TODO -> After payment integration add 30 days reset for paid user from purchase date  

const incrementQuestionUsage = async (user) => {
    const now = new Date();

    const today = now.toISOString().slice(0, 10);
    const month = today.slice(0, 7);
    const userId = user._id;

    return await Usage.findOneAndUpdate(
        { userId },
        [
            {
                $set: {
                    totalQuestions: {
                        $add: [
                            { $ifNull: ["$totalQuestions", 0] },
                            1,
                        ],
                    },

                    dailyQuestions: {
                        $cond: [
                            { $eq: ["$dailyQuestionDate", today] },
                            {
                                $add: [
                                    { $ifNull: ["$dailyQuestions", 0] },
                                    1,
                                ],
                            },
                            1,
                        ],
                    },

                    dailyQuestionDate: today,

                    monthlyQuestions: {
                        $cond: [
                            { $eq: ["$monthlyQuestionPeriod", month] },
                            {
                                $add: [
                                    { $ifNull: ["$monthlyQuestions", 0] },
                                    1,
                                ],
                            },
                            1,
                        ],
                    },

                    monthlyQuestionPeriod: month,
                },
            },
        ],
        { upsert: true, new: true, updatePipeline: true, }
    );
};

 const incrementPdfUsage = async (user) => {
    const now = new Date();

    const month = now.toISOString().slice(0, 7);
    const userId = user._id;

    return await Usage.findOneAndUpdate(
        { userId },
        [
            {
                $set: {
                    totalPdfUploads: {
                        $add: [
                            { $ifNull: ["$totalPdfUploads", 0] },
                            1,
                        ],
                    },

                    monthlyPdfUploads: {
                        $cond: [
                            { $eq: ["$monthlyPdfPeriod", month] },
                            {
                                $add: [
                                    { $ifNull: ["$monthlyPdfUploads", 0] },
                                    1,
                                ],
                            },
                            1,
                        ],
                    },

                    monthlyPdfPeriod: month,
                },
            },
        ],
        {
            upsert: true,
            new: true,
            updatePipeline: true,
        }
    );
};

export { incrementPdfUsage, incrementQuestionUsage }