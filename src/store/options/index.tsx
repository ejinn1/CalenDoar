import { create } from "zustand";

export interface Option {
  id?: string;
  name: string;
  color: string;
  link?: string;
  number?: string;
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
    {
      name: "일정",
      color: "#D3D3D3",
      link: "/schedule",
      id: "7a76de77-c79e-4223-bc9a-8ddf7e619de8",
    },
    {
      name: "할일",
      color: "#D3D3D3",
      link: "/todo",
      id: "e8ab09a4-602f-4dc4-9a36-a2e1f86750af",
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
