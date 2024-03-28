import { create } from "zustand";

type PracticeModalStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const usePracticeModal = create<PracticeModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))
