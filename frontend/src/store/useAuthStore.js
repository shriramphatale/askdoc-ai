import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,

    checkAuth: async () => {
        set({isCheckingAuth: true})
        try {
            const res = await axiosInstance.get('/auth/profile')
            console.log("checkAuth response:", res.data)
            set({authUser: res.data})
        } catch (error) {
            console.log("error in checkAuth", error)
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
            console.log(res.data)
        } catch (error) {
            console.log(error.response.data)
        } finally {
            set({isSigningUp: false})
        }
    },

    login: async (data) => {
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post('/auth/login', data)
            set({authUser: res.data})
            console.log(res.data)
        } catch (error) {
            console.log(error.response.data)
        } finally {
            set({isLoggingIn: false})
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout')
            set({authUser: null})
        } catch (error) {
            console.log(error)
        }
    },

}))