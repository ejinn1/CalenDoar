import { create } from "zustand";

export interface Option {
  id: string;
  name: string;
  color: string;
}

interface OptionsState {
  allOption: Option;
  selectedOption: Option;
  setSelectedOption: (option: Option) => void;
  options: Option[];
  setOptions: (options: Option[]) => void;
  isUpdate: boolean;
  toggleUpdate: () => void;
}

const useOptionState = create<OptionsState>((set) => ({
  allOption: {
    name: "전체",
    color: "#D3D3D3",
    id: "a7a9a629-fc06-4fc3-99bd-7ba881e4fb0f",
  },
  selectedOption: {
    name: "전체",
    color: "#D3D3D3",
    id: "a7a9a629-fc06-4fc3-99bd-7ba881e4fb0f",
  },
  setSelectedOption: (option: Option) =>
    set(() => ({ selectedOption: option })),
  options: [],
  setOptions: (options) => set({ options }),
  isUpdate: false,
  toggleUpdate: () => set((state) => ({ isUpdate: !state.isUpdate })),
}));

export default useOptionState;
