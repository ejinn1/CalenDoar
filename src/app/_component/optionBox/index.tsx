"use client";

import AddOptionModal from "@/app/(auth)/_component/addOptionModal";
import useModalOpen from "@/app/hook/useModalOpen";
import Image from "next/image";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

const Button = tw.button`
  w-full h-[4rem] bg-lightgray rounded-lg font-semibold
`;

const AddButton = tw.div`
  w-full h-[4rem] border-lightgray border-2 border-dotted rounded-lg
  transition-opcatity duration-300 ease-in-out
  flex justify-center items-center font-bold
`;

export default function OptionBox() {
  const [isHover, setIsHover] = useState(false);
  const { isOpen, openModal, closeModal } = useModalOpen();

  const handleOpenModal = () => {
    openModal();
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    if (!isOpen) {
      setIsHover(false);
    }
  };

  useEffect(() => {
    handleMouseLeave();
  }, [isOpen]);

  const LISTS = ["전체", "일정", "할일"];

  return (
    <div className="bg-white rounded-lg w-[20rem] h-full flex flex-col p-[1rem] gap-[1rem]">
      <div className="h-[3rem] flex justify-end items-center opacity-20 hover:opacity-55 transition-opacity duration-300 ease-in-out">
        <div
          className="hover:bg-lightgray rounded-full cursor-pointer transition-bg duration-300 ease-in-out"
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={handleMouseLeave}
          onClick={handleOpenModal}
        >
          <Image src="/add.png" alt="더하기" width={18} height={18} />
        </div>
      </div>
      {LISTS.map((list) => (
        <Button key={list}>{list}</Button>
      ))}
      <AddButton className={isHover ? "opacity-100" : "opacity-0"}>
        추가
      </AddButton>
      {isOpen && <AddOptionModal onClose={closeModal} />}
    </div>
  );
}
