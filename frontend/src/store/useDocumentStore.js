import {create} from 'zustand'

export const useDocumentStore = create((set) => ({
    isSidebarOpen: typeof window !== "undefined"
        ? window.innerWidth >= 768
        : true,

    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

    closeSidebar: () => set({ isSidebarOpen: false})

}))