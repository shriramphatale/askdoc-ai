import { create } from "zustand";
const isDesktop = () => window.innerWidth >= 1024;

export const useUIStore = create((set) => ({
  isUserMenuOpen: false,
  isPdfOpen: isDesktop(),

  openPdf: () => set({ isPdfOpen: true }),
  closePdf: () => set({ isPdfOpen: false }),
  togglePdf: () => set((state) => ({
    isPdfOpen: !state.isPdfOpen,
  })),


  toggleUserMenu: () =>
    set((state) => ({
      isUserMenuOpen: !state.isUserMenuOpen,
    })),

  closeUserMenu: () =>
    set({
      isUserMenuOpen: false,
    }),
}));