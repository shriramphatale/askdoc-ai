import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'
import toast from "react-hot-toast"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,

    checkAuth: async () => {
        set({isCheckingAuth: true})
        try {
            const res = await axiosInstance.get('/auth/profile')
            set({authUser: res.data})
        } catch (error) {
            set({authUser: null})
        } finally {
            set({isCheckingAuth: false})
        }
    },

    signup: async (data) => {
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            set({authUser: res.data})
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed. Please try again")
        } finally {
            set({isSigningUp: false})
        }
    },

    login: async (data) => {
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post('/auth/login', data)
            set({authUser: res.data})
            toast.success("Welcome back!")
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed. Please try again")
        } finally {
            set({isLoggingIn: false})
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout')
            set({authUser: null})
            toast("See you again soon")
        } catch (error) {
            toast.error(error.response?.data?.message || "Error in logout")
        }
    },

}))