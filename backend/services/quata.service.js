import {redis} from "../config/redis.js"

const PLAN_LIMITS = {
    free: {
        pdfUploadsMonthly: 5,
        questionsDaily: 10,
        maxPdfSizeMB: 10,
        maxPages: 50,
    },

    paid: {
        pdfUploadsMonthly: 50,
        questionsMonthly: 1000,
        maxPdfSizeMB: 25,
        maxPages: 200,
    }
};

const checkPdfUploadQuota = async (user) => {
    const plan = user.plan === "paid" ? "paid" : "free";

    const limit = PLAN_LIMITS[plan].pdfUploadsMonthly;

    // Generate key for the current month
    const now = new Date();
    const month = now.toISOString().slice(0, 7); // YYYY-MM

    const redisKey = `usage:${user._id}:pdfUploads:${month}`;

    // Get current usage
    const currentUsage = Number(await redis.get(redisKey) || 0);

    // Check quota before incrementing
    if (currentUsage >= limit) {
        return {
            allowed: false,
            used: currentUsage,
            limit,
            remaining: 0,
            message: "Monthly PDF upload limit exceeded",
        };
    }

    // Increment usage
    const updatedUsage = await redis.incr(redisKey);

    // Set expiry until the end of the month
    if (updatedUsage === 1) {
        const endOfMonth = new Date(
            Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)
        );

        const secondsUntilReset = Math.ceil(
            (endOfMonth.getTime() - now.getTime()) / 1000
        );

        await redis.expire(redisKey, secondsUntilReset);
    }

    return {
        allowed: true,
        used: updatedUsage,
        limit,
        remaining: limit - updatedUsage,
        message: "PDF upload quota available",
    };
};


const checkQuestionQuota = async (user) => {
    const plan = user.plan === "paid" ? "paid" : "free";

    const isPaid = plan === "paid";

    const limit = isPaid
        ? PLAN_LIMITS.paid.questionsMonthly
        : PLAN_LIMITS.free.questionsDaily;

    const now = new Date();

    // Free: daily counter | Paid: monthly counter
    const period = isPaid
        ? now.toISOString().slice(0, 7) // YYYY-MM
        : now.toISOString().slice(0, 10); // YYYY-MM-DD

    const redisKey = `usage:${user._id}:questions:${period}`;

    const currentUsage = Number(await redis.get(redisKey) || 0);

    if (currentUsage >= limit) {
        return {
            allowed: false,
            used: currentUsage,
            limit,
            remaining: 0,
            message: isPaid
                ? "Monthly question limit exceeded"
                : "Daily question limit exceeded",
        };
    }

    const updatedUsage = await redis.incr(redisKey);

    // Set expiry only when the counter is created
    if (updatedUsage === 1) {
        const nextReset = isPaid
            ? new Date(Date.UTC(
                now.getUTCFullYear(),
                now.getUTCMonth() + 1,
                1
            ))
            : new Date(Date.UTC(
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate() + 1
            ));

        const secondsUntilReset = Math.ceil(
            (nextReset.getTime() - now.getTime()) / 1000
        );

        await redis.expire(redisKey, secondsUntilReset);
    }

    return {
        allowed: true,
        used: updatedUsage,
        limit,
        remaining: limit - updatedUsage,
        message: "Question quota available",
    };
};

export {checkPdfUploadQuota, checkQuestionQuota};