import { create } from "zustand";

export const useUIStore = create((set) => ({
  isUserMenuOpen: false,

  toggleUserMenu: () =>
    set((state) => ({
      isUserMenuOpen: !state.isUserMenuOpen,
    })),

  closeUserMenu: () =>
    set({
      isUserMenuOpen: false,
    }),
}));