import { Usage } from "../models/usage.model.js";
import { Document } from "../models/document.model.js";
import { redis } from "../config/redis.js";

const getDashboard = async (req, res) => {
    try {
        const user = req.user;
        const now = new Date();

        const month = now.toISOString().slice(0, 7);
        const today = now.toISOString().slice(0, 10);

        const isPaid = user.plan === "paid";

        // Your existing Redis key formats
        const pdfRedisKey =
            `usage:${user._id}:pdfUploads:${month}`;

        const period = isPaid ? month : today;

        const questionRedisKey =
            `usage:${user._id}:questions:${period}`;

        // Read both counters from Redis first
        const [cachedPdfs, cachedQuestions] =
            await Promise.all([
                redis.get(pdfRedisKey),
                redis.get(questionRedisKey),
            ]);

        let pdfsThisMonth;
        let questionsThisPeriod;

        // PDF usage: Redis first, MongoDB fallback
        if (cachedPdfs !== null) {
            pdfsThisMonth = Number(cachedPdfs);
        } else {
            const usage = await Usage.findOne({
                userId: user._id,
            }).lean();

            pdfsThisMonth =
                usage?.monthlyPdfPeriod === month
                    ? usage.monthlyPdfUploads ?? 0
                    : 0;

            await redis.set(
                pdfRedisKey,
                String(pdfsThisMonth),
                "EX",
                60 * 60 * 24 * 32
            );
        }

        // Question usage: Redis first, MongoDB fallback
        if (cachedQuestions !== null) {
            questionsThisPeriod = Number(cachedQuestions);
        } else {
            const usage = await Usage.findOne({
                userId: user._id,
            }).lean();

            if (isPaid) {
                questionsThisPeriod =
                    usage?.monthlyQuestionPeriod === month
                        ? usage.monthlyQuestions ?? 0
                        : 0;
            } else {
                questionsThisPeriod =
                    usage?.dailyQuestionDate === today
                        ? usage.dailyQuestions ?? 0
                        : 0;
            }

            const nextReset = isPaid
            ? new Date(Date.UTC(
                now.getUTCFullYear(),
                now.getUTCMonth() + 1,
                1
            )) : new Date(Date.UTC(
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate() + 1
            ));

            const secondsUntilReset = Math.ceil(
                (nextReset.getTime() - now.getTime()) / 1000
            );

            await redis.set( // set for day and month
                questionRedisKey,
                String(questionsThisPeriod),
                "EX",
                secondsUntilReset
            );
        }

        // Lifetime PDF count
        // TODO -> add to redis
        const usage = await Usage.findOne({
            userId: user._id,
        }).select("totalPdfUploads totalQuestions").lean();

        const totalPdfs = usage?.totalPdfUploads ?? 0;
        const totalQuestions = usage?.totalQuestions ?? 0;

        const recentDocuments = await Document.find({
            userId: user._id,
        }).select("title fileName fileSize status createdAt")
            .sort({ createdAt: -1 })
            .limit(5)
            .lean();

        return res.status(200).json({
            success: true,
            plan: user.plan,

            pdfs: {
                total: totalPdfs,
                monthly: pdfsThisMonth,
                monthlyLimit: isPaid ? 50 : 5,
            },

            questions: {
                total: totalQuestions,
                used: questionsThisPeriod,
                period: isPaid ? "monthly" : "daily",
                limit: isPaid ? 1000 : 20,
            },

            recentDocuments,
        });
    } catch (error) {
        console.error("getDashboard error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to load dashboard",
        });
    }
};

export { getDashboard, }


// add expiry to questionRedisKey from day of purchase to month
// add totalPDf and totalquestion to redis
// add recentDocuments to redis