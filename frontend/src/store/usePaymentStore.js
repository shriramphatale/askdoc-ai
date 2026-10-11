import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import { useAuthStore } from "./useAuthStore.js"

export const usePaymentStore = create((set) => ({
    isLoading: false,
    isVerifying: false,
    isPaymentSuccessful: false,
    order: null,

    startPayment: async () => {
        set({isLoading: true});
        try{
            const { data } = await axiosInstance.post('/payment/create-order');
            const order = {
                amount: data.amount,
                currency: data.currency,
                keyId: data.keyId,
                orderId: data.orderId,
            }
            return order;
        }catch (error) {
            toast.error( error.response?.data?.message || "Unable to create payment order")
        } finally {
            set({ isUploading: false });
        }
    },

    verifyPayment: async( response ) => {
        set({isVerifying: true});
        try{
            const { data } = await axiosInstance.post('/payment/verify', {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
            },);

            toast.success(data.message || "Payment verified successfully!");
            // Update authenticated user's plan
            const { authUser, setAuthUser } = useAuthStore.getState();
            if (authUser) {
                setAuthUser({
                    ...authUser,
                    plan: "paid",
                });
            }
            return data;
        } catch(error) {
            console.log(error.response?.data?.message);
            toast.error( error.response?.data?.message || "Payment verification failed");
        } finally {
            set({isVerifying: false});
        }
    },
}))