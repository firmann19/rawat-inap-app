import { create } from "zustand";
import { Pasien } from "@/types/pasien";

type State = {
  pasien: Pasien[];
  addPasien: (data: Pasien) => void;
  setPasien: (data: Pasien[]) => void;
};

export const usePasienStore = create<State>((set) => ({
  pasien: [],
  setPasien: (data) => set({ pasien: data }),
  addPasien: (data) =>
    set((state) => ({
      pasien: [...state.pasien, data],
    })),
}));
