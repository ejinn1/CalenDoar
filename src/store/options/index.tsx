import { create } from "zustand";

interface Option {
  name: string;
  color: string;
  link: string;
}

interface OptionsState {
  options: Option[];
  addOption: (option: Option) => void;
  deleteOption: (optionName: string) => void;
}

const useOptionState = create<OptionsState>((set) => ({
  options: [
    { name: "전체", color: "#D3D3D3", link: "/" },
    { name: "일정", color: "#D3D3D3", link: "/schedule" },
    { name: "할일", color: "#D3D3D3", link: "/todo" },
  ],
  addOption: (newOption: Option) =>
    set((state) => ({
      options: [...state.options, newOption],
    })),
  deleteOption: (optionName: string) =>
    set((state) => ({
      options: state.options.filter((option) => option.name !== optionName),
    })),
}));

export default useOptionState;
