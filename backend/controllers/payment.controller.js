import { razorpay } from "../config/razorpay.js"
import { Payment } from "../models/payment.model.js"
import { User } from "../models/user.model.js";
import crypto from 'crypto'
import { ENV } from "../config/env.js"

const createOrder = async (req,res) => {
    try {
        // options
        const amount = 29900;
        const currency = "INR";

        // Create order with Razorpay
        const order = await razorpay.orders.create({
            amount: amount,
            currency: currency,
            receipt: `askdoc_${Date.now()}`,
        });

        if(!order){
            res.status(500).json({message: "Failed to create payment order", error: error.message});
        }

        // Save order in MongoDB
        await Payment.create({
            userId: req.user._id,
            razorpayOrderId: order.id,
            amount: order.amount,
            currency: order.currency,
            status: "created",
            plan: "paid",
        });

        return res.status(201).json({ 
            message: "Payment order created successfully",
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: ENV.RAZORPAY_KEY_ID,
        });

    } catch (error) {
        console.log("Create payment order error:", error);
        res.status(500).json({message: "Failed to create payment order", error: error.message});
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature, } = req.body;
        const userId = req.user._id;

        // Validate request data
        if ( !razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            return res.status(400).json({ message: "Payment details are required", });
        }

        const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id, userId, });

        if (!payment) {
            return res.status(404).json({ message: "Payment order not found", });
        }

        // Prevent processing an already-paid order again
        if (payment.status === "paid") {
            return res.status(409).json({ message: "This order has already been processed", });
        }

        // Generate expected signature
        const generatedSignature = crypto.createHmac( "sha256", process.env.RAZORPAY_KEY_SECRET )
            .update( `${payment.razorpayOrderId}|${razorpay_payment_id}`).digest("hex");

        // Compare signatures safely
        const expectedBuffer = Buffer.from( generatedSignature, "hex" );

        const receivedBuffer = Buffer.from( razorpay_signature, "hex" );

        if ( expectedBuffer.length !== receivedBuffer.length || !crypto.timingSafeEqual(
                expectedBuffer,
                receivedBuffer
            )) {
            return res.status(400).json({ message: "Invalid payment signature", });
        }

        // Fetch payment details directly from Razorpay
        const razorpayPayment = await razorpay.payments.fetch(razorpay_payment_id);

        // Confirm this payment belongs to the saved order
        if ( razorpayPayment.order_id !== payment.razorpayOrderId ||
            razorpayPayment.amount !== payment.amount ||
            razorpayPayment.currency !== payment.currency) {
            return res.status(400).json({ message: "Payment details do not match the order", });
        }

        // Only grant access after payment is captured
        if (razorpayPayment.status !== "captured") {
            return res.status(409).json({ message: "Payment has not been captured yet", paymentStatus: razorpayPayment.status, });
        }

        // Calculate 30-day expiry.
        // Extend an existing active plan rather than losing
        // its remaining days.
        const user = req.user

        const now = new Date();

        const currentExpiry = user.plan === "paid" && user.planExpiresAt && user.planExpiresAt > now
                ? user.planExpiresAt
                : now;

        const planExpiresAt = new Date(currentExpiry);
        planExpiresAt.setDate(planExpiresAt.getDate() + 30);

        // Save the payment and activate the plan
        payment.razorpayPaymentId = razorpay_payment_id;
        payment.status = "paid";

        user.plan = "paid";
        user.planExpiresAt = planExpiresAt;

        await Promise.all([ payment.save(), user.save(), ]);

        return res.status(200).json({ message: "Payment verified successfully",
            plan: user.plan,
            planExpiresAt: user.planExpiresAt,
        });
    } catch (error) {
        console.error("Verify payment error:", error);
        return res.status(500).json({ message: "Failed to verify payment", });
    }
};

export { createOrder, verifyPayment };