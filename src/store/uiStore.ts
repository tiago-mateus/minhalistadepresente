import { create } from 'zustand';

interface UIState {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  modalOpen: false,
  setModalOpen: (value) => set({ modalOpen: value }),
}));
