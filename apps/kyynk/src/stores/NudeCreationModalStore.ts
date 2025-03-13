import { create } from 'zustand';

interface NudeCreationModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useNudeCreationModalStore = create<NudeCreationModalState>(
  (set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
  }),
);
