import { create } from "zustand"
import {axiosInstance} from '../lib/axios'

export const useChatStore = create((set, get) => ({
    messages: [],
    isMessagesLoading: false,
    isMessageLoading: false,

    sendMessage: async (documentId, content) => {
        if(!content.trim()) return;
        try {
            const userMessage = {
                _id: crypto.randomUUID(),
                role: "user",
                content,
                createdAt: new Date().toISOString(),
            }

            set((state) => ({
                messages: [...state.messages, userMessage],
                isMessageLoading: true,
            }))

            const response = {
                _id: crypto.randomUUID(),
                role: "assistant",
                content: 'This is Sample Ai Response',
                createdAt: new Date().toISOString(),
            }

            set((state) => ({
                messages: [...state.messages, response],
            }));
        } catch(error) {
            console.error(error);
        } finally {
            set({isMessageLoading: false,});
        };
        
    }

}));


