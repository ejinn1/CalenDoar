"use client";

import { optionColors } from "@/constants/optionColor";
import { createClient } from "@/libs/supabase/client";
import useOptionState from "@/store/options";
import useUserInfoStore from "@/store/user/info";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import tw from "tailwind-styled-components";

interface Prop {
  onClose: () => void;
}

const Field = tw.div`
  flex flex-col gap-[1rem]
`;

const Label = tw.label`
  text-m font-semibold
`;

const Input = tw.input`
  text-m font-medium bg-lightgray rounded-lg p-[1rem] outline-none
`;

const ButtonContainer = tw.div`
  w-[3rem] h-[3rem] flex justify-center items-center
`;

const ColorButton = tw.button`
  w-[2.5rem] h-[2.5rem] rounded-full border-2
  transition-all duration-200 ease-in-out
  hover:w-[3rem] hover:h-[3rem]
`;

const AddButton = tw.button`
  w-full rounded-xl bg-lightgray h-[6rem] text-m font-semibold
`;

// 서버 연결 필요함
export default function AddOptionModal({ onClose }: Prop) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const { options, addOption } = useOptionState();
  const { user } = useUserInfoStore();

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newOption = {
      name: name,
      color: color,
      user_id: user?.id,
    };

    console.log(newOption);

    const { data, error } = await supabase
      .from("options")
      .insert(newOption)
      .select();

    if (error) {
      console.log(error);
    } else {
      addOption(newOption);
    }

    // router.push("/");
  };

  const handleSelectedColor = (selectedColor: string) => {
    if (selectedColor !== color) {
      setColor(selectedColor);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center z-10 drop-shadow-md">
      <div className="relative bg-white p-[2rem] rounded-lg w-[40rem] h-[40rem] shadow-md">
        <h1 className="text-l font-bold">옵션 추가</h1>
        <IoClose
          onClick={onClose}
          size={28}
          className="absolute top-[2rem] right-[2rem] cursor-pointer opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-100"
        />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between gap-[2rem] h-[calc(100%-3rem)] pt-[4rem]"
        >
          <div className="flex flex-col gap-[2rem]">
            <Field>
              <Label htmlFor="optionName">이름</Label>
              <Input
                id="optionName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="optionColor">색상</Label>
              <div className="grid grid-cols-7 gap-[1rem] justify-center items-center bg-lightgray rounded-lg p-[2rem]">
                {optionColors.map((option, index) => (
                  <ButtonContainer key={index}>
                    <ColorButton
                      type="button"
                      style={{ backgroundColor: option.value }}
                      className={`${
                        color === option.value ? "w-[3rem] h-[3rem]" : ""
                      }`}
                      onClick={() => handleSelectedColor(option.value)}
                    />
                  </ButtonContainer>
                ))}
              </div>
            </Field>
          </div>
          <AddButton>추가</AddButton>
        </form>
      </div>
    </div>
  );
}
