import {create} from 'zustand'
import {axiosInstance} from '../lib/axios'
import {useChatStore} from './useChatStore'
import toast from "react-hot-toast"

export const useDocumentStore = create((set) => ({
    documents: [],
    selectedDocument: null,
    isUploading: false,
    isDocumentsLoading:false,
    isDocumentLoading:false,
    isDeleting:false,
    isSidebarOpen: typeof window !== "undefined"
        ? window.innerWidth >= 768
        : true,

    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

    closeSidebar: () => set({ isSidebarOpen: false}),

    setSelectedDocument: (document) => {
        set({ selectedDocument: document });
    },

    uploadDocument: async (file) => {
        set({ isUploading: true });
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axiosInstance.post('/documents/', formData)
            
            // Clear messages from previous conversation
            useChatStore.getState().clearMessages();

            useChatStore.getState().setConversationId(response.data.conversation._id)
            set((state) => ({ 
                documents: [...state.documents, response.data.document], 
                selectedDocument: response.data.document, 
            }));
            toast.success("Document uploaded successfully");
        } catch (error) {
            toast.error( error.response?.data?.message || "Failed to upload document")
        } finally {
            set({ isUploading: false });
        }
    },

    getAllDocuments: async () => {
        set({ isDocumentsLoading: true });
        try {
            const response = await axiosInstance.get('/documents/');
            set({ documents: response.data.documents });
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
        } finally {
            set({ isDocumentsLoading: false });
        }
    },

    getDocument: async (id) => {
        set({ isDocumentLoading: true });
        try {
            const response = await axiosInstance.get(`/documents/${id}`);
            set({ selectedDocument: response.data.document });
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
        } finally {
            set({ isDocumentLoading: false });
        }
    },

    deleteDocument: async (id) => {
        set({ isDeleting: true });
        try {
            await axiosInstance.delete(`/documents/${id}`);
            set((state) => ({
                documents: state.documents.filter((doc) => doc._id !== id),
                selectedDocument: state.selectedDocument?._id === id ? null : state.selectedDocument,
            }));
            toast.success("Document deleted successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete document");
        } finally {
            set({ isDeleting: false });
        }
    },
}))