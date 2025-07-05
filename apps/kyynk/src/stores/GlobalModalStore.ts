import { create } from 'zustand';

interface GlobalModalState {
  openNotEnoughCreditModal: boolean;
  setOpenNotEnoughCreditModal: (open: boolean) => void;
}

export const useGlobalModalStore = create<GlobalModalState>((set) => ({
  openNotEnoughCreditModal: false,
  setOpenNotEnoughCreditModal: (open: boolean) =>
    set({ openNotEnoughCreditModal: open }),
}));
