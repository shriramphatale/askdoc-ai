import { create } from "zustand"
import {axiosInstance} from '../lib/axios'
import { useDocumentStore } from "../store/useDocumentStore"
import toast from 'react-hot-toast'

export const useChatStore = create((set, get) => ({
    messages: [],
    recentChats: [],
    conversationId: null,
    isRecentChatsLoading: false,
    isMessagesLoading: false,
    isMessageLoading: false,

    setConversationId: (conversationId) => {
        set({conversationId});
    },

    sendMessage: async (documentId, question) => {
        if(!question.trim()) return;
        const {conversationId} = get()
        if(!conversationId) {
            console.log("ConversationId not found");
            return;
        }
        try {
            const userMessage = {
                _id: `temp-${Date.now()}`,
                role: 'user',
                content: question.trim()
            };
            set((state) => ({
                messages: [...state.messages, userMessage],
                isMessageLoading: true,
            }))

            const response = await axiosInstance.post(`/chats/${conversationId}`, {question: question.trim()});
            
            set((state) => ({
                messages: [...state.messages, response.data.data],
            }));
        } catch(error) {
            toast.error(error.response?.data?.message || "Failed to send message");
        } finally {
            set({isMessageLoading: false,});
        };
        
    },

    getRecentChats: async () => {
        try {
            set({ isRecentChatsLoading: true });
            const response = await axiosInstance.get('/chats/recents');
            console.log(response.data.data)
            set({recentChats: response.data.data})
        } catch (error) {
            console.log("Error fetching recent chats:", error);
            toast.error(error.response?.data?.message || "Error fetching recent chats");
        } finally {
            set({isRecentChatsLoading: false})
        }
    },

    getMessages: async (conversationId) => {
        if(!conversationId) return;
        try {
            set({conversationId, isMessagesLoading: true});
            const response = await axiosInstance.get(`/chats/${conversationId}`);
            useDocumentStore.getState().setSelectedDocument(response.data.document)
            set({messages: response.data.messages})
        } catch (error) {
            console.log("Error fetching messages: ", error);
            toast.error(error.response?.data?.message || "Failed to fetch messages")
        } finally {
            set({isMessagesLoading: false})
        }
    },

    deleteConversation: async (conversationId) => {
        if(!conversationId) return;
        try {
            await axiosInstance.delete(`/chats/${conversationId}`);

            const currentConversationId = get().conversationId;
            
            //remove from recent chats
            set((state) => ({
                recentChats: state.recentChats.filter(
                    (chat) => chat._id !== conversationId
                ),
            }));

            //if deleted conversation is currently open
            if(currentConversationId === conversationId) {
                set({
                    conversationId: null,
                    messages: [],
                });

                //clear selected document
                useDocumentStore.getState().setSelectedDocument(null)
            }

            toast.success("Conversation deleted");
        } catch (error) {
            console.log("Error deleting conversation:", error);
            toast.error(error.response?.data?.message || "Failed to delete conversation");
        }
    }

}));


