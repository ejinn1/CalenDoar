import { create } from "zustand";

export interface Option {
  id?: number;
  name: string;
  color: string;
  link?: string;
  number?: string;
}

interface OptionsState {
  options: Option[];
  setOptions: (options: Option[]) => void;
  addOption: (option: Option) => void;
  deleteOption: (optionName: string) => void;
}

const useOptionState = create<OptionsState>((set) => ({
  options: [
    { name: "전체", color: "#D3D3D3", link: "/" },
    { name: "일정", color: "#D3D3D3", link: "/schedule" },
    { name: "할일", color: "#D3D3D3", link: "/todo" },
  ],
  setOptions: (setOptions: Option[]) =>
    set((state) => {
      const updatedOptions = [...state.options];

      setOptions.forEach((setOption) => {
        const exists = state.options.some(
          (existingOption) => existingOption?.id === setOption.id
        );
        if (!exists) {
          updatedOptions.push(setOption);
        }
      });

      return {
        options: updatedOptions,
      };
    }),
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
