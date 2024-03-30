"use client";

import { optionColors } from "@/constants/optionColor";
import { createClient } from "@/libs/supabase/client";
import useOptionState from "@/store/options";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import tw from "tailwind-styled-components";
import Container from "../_components/Container";

interface Prop {
  onClose: () => void;
}

const Field = tw.div`
  flex flex-col gap-[1rem] relative
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
  w-[2rem] h-[2rem] rounded-full border-2
  transition-all duration-200 ease-in-out
  hover:w-[3rem] hover:h-[3rem]
`;

const AddButton = tw.button`
  w-full rounded-xl bg-lightgray h-[4rem] text-m font-semibold
`;

export default function AddOptionModal({ onClose }: Prop) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const supabase = createClient();
  const { toggleUpdate } = useOptionState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) return;
    if (!color) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const newOption = {
      name: name,
      color: color,
      user_id: user.id,
    };

    const { error } = await supabase.from("options").insert(newOption);

    if (error) {
      console.log(error);
    } else {
      toggleUpdate();
      onClose();
    }
  };

  const handleSelectedColor = (selectedColor: string) => {
    if (selectedColor !== color) {
      setColor(selectedColor);
    }
  };

  return (
    <Container>
      <h1 className="text-l font-bold">옵션 추가</h1>
      <IoClose
        onClick={onClose}
        size={20}
        className="absolute top-[2rem] right-[2rem] cursor-pointer opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-100"
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between gap-[2rem] h-[calc(100%-2rem)] pt-[4rem]"
      >
        <div className="flex flex-col gap-[4rem]">
          <Field>
            <Label htmlFor="optionName">이름</Label>
            <Input
              id="optionName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {!name && (
              <span className="absolute -bottom-[2rem] left-0 text-lightred flex items-center gap-[0.3rem]">
                추가할 옵션의 이름을 입력해주세요
              </span>
            )}
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
                      color === option.value ? "w-[2.5rem] h-[2.5rem]" : ""
                    }`}
                    onClick={() => handleSelectedColor(option.value)}
                  />
                </ButtonContainer>
              ))}
            </div>
            {!color && (
              <span className="absolute -bottom-[2rem] left-0 text-lightred flex items-center gap-[0.3rem]">
                추가할 옵션의 색상을 선택해주세요
              </span>
            )}
          </Field>
        </div>
        <AddButton>추가</AddButton>
      </form>
    </Container>
  );
}
