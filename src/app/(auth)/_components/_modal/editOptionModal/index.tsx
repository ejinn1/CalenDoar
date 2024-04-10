"use client";

import {
  optionBrightColors,
  optionColors,
  optionLightColors,
} from "@/constants/optionColor";
import useModalOpen from "@/hooks/useModalOpen";
import { createClient } from "@/libs/supabase/client";
import useOptionState, { Option } from "@/store/options";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import tw from "tailwind-styled-components";
import Container from "../_components/Container";
import DeleteModal from "../_components/deleteModal";

interface Prop {
  pickedOption: Option;
  onClose: () => void;
}

const Field = tw.div`
  flex flex-col gap-[1rem] relative
`;

const Label = tw.label`
  text-m font-semibold
`;

const Input = tw.input`
  text-m font-medium bg-lightgray dark:bg-darkgray rounded-lg p-[1rem] outline-none
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
  w-full rounded-xl bg-lightgray dark:bg-darkgray h-[4rem]
`;

export default function EditOptionModal({ pickedOption, onClose }: Prop) {
  const supabase = createClient();

  const { toggleUpdate } = useOptionState();
  const {
    isOpen: isOpenDel,
    openModal: openDel,
    closeModal: closeDel,
  } = useModalOpen();

  const [name, setName] = useState("");
  const [color, setColor] = useState(pickedOption.color);
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) return;
    if (!color) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const EditOption = {
      name: name,
      color: color,
      user_id: user.id,
    };

    const { error } = await supabase
      .from("options")
      .update(EditOption)
      .eq("id", pickedOption.id);

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

  const handleDelete = async () => {
    const { error } = await supabase
      .from("options")
      .delete()
      .eq("id", pickedOption.id);

    if (error) {
      console.log(error);
    } else {
      toggleUpdate();
      onClose();
    }
  };

  useEffect(() => {
    setName(pickedOption.name);
    setColor(pickedOption.color);
  }, []);

  useEffect(() => {
    if (pickedOption.name !== name || pickedOption.color !== color) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [name, color]);

  return (
    <Container>
      <h1 className="text-l font-bold">{pickedOption.name} 수정하기</h1>
      <IoClose
        onClick={onClose}
        size={20}
        className="absolute top-[2rem] right-[2rem] cursor-pointer opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-100"
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between gap-[4rem] h-full pt-[2rem]"
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
              <span className="absolute -bottom-[2rem] left-0 text-lightred dark:text-lightyellow flex items-center gap-[0.3rem]">
                추가할 옵션의 이름을 입력해주세요
              </span>
            )}
          </Field>
          <Field>
            <Label htmlFor="optionColor">색상</Label>
            <div className="grid grid-cols-7 gap-[1rem] justify-center items-center bg-lightgray dark:bg-darkgray rounded-lg p-[2rem]">
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
              {optionLightColors.map((option, index) => (
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
              {optionBrightColors.map((option, index) => (
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
              <span className="absolute -bottom-[2rem] left-0 text-lightred dark:text-lightyellow flex items-center gap-[0.3rem]">
                추가할 옵션의 색상을 선택해주세요
              </span>
            )}
          </Field>
        </div>
        <div className="flex gap-[1rem] text-m font-semibold">
          <button
            type="button"
            onClick={openDel}
            className="min-w-[5rem] rounded-lg bg-lightred text-white"
          >
            삭제
          </button>
          <AddButton
            type="submit"
            disabled={!isEdit}
            className={`${!isEdit ? "bg-lightgray" : "bg-lightblue"}`}
          >
            수정
          </AddButton>
        </div>
      </form>
      {isOpenDel && (
        <DeleteModal closeDel={closeDel} handleDelete={handleDelete} />
      )}
    </Container>
  );
}
