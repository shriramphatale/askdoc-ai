import { create } from "zustand";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast"

export const useDashboardStore = create((set) => ({
    dashboard: null,
    isLoading: false,

    fetchDashboard: async () => {
        set({ isLoading: true });
        try {
            const { data } = await axiosInstance.get("/dashboard");
            set({ dashboard: data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch dashboard data");
        } finally {
            set({ isLoading: false });
        }
    },

    clearDashboard: () => {
        set({ dashboard: null });
    },
}));

