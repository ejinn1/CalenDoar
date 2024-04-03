import { create } from "zustand";

export interface Option {
  id?: string;
  name: string;
  color: string;
  link?: string;
}

interface OptionsState {
  options: Option[];
  setOptions: (options: Option[]) => void;
  isUpdate: boolean;
  toggleUpdate: () => void;
}

const useOptionState = create<OptionsState>((set) => ({
  options: [
    {
      name: "전체",
      color: "#D3D3D3",
      link: "/",
      id: "a7a9a629-fc06-4fc3-99bd-7ba881e4fb0f",
    },
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
  isUpdate: false,
  toggleUpdate: () => set((state) => ({ isUpdate: !state.isUpdate })),
}));

export default useOptionState;
