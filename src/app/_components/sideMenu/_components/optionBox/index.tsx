"use client";

import AddOptionModal from "@/app/(auth)/_components/addOptionModal";
import useModalOpen from "@/hooks/useModalOpen";
import { createClient } from "@/libs/supabase/client";
import useOptionState, { Option } from "@/store/options";
import useUserInfoStore from "@/store/user/info";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

const Container = tw.nav`
  bg-white rounded-lg w-[20rem] h-full flex flex-col p-[1rem] gap-[1rem]
`;

const Ul = tw.ul`
  flex flex-col gap-[1rem] w-full
`;

const Li = tw.li`
  w-full h-[4rem] bg-lightgray rounded-lg font-semibold
  flex justify-center items-center
`;

const AddBox = tw.div`
  w-full h-[4rem] border-lightgray border-2 border-dotted rounded-lg
  transition-opcatity duration-300 ease-in-out
  flex justify-center items-center font-bold
`;

export default function OptionBox() {
  const [isHover, setIsHover] = useState(false);
  const { isOpen, openModal, closeModal } = useModalOpen();
  const { options, setOptions } = useOptionState();
  const supabase = createClient();
  const { user } = useUserInfoStore();

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
  }, [isOpen, handleMouseLeave]);

  useEffect(() => {
    const getOptions = async () => {
      if (user && user?.id) {
        const { data, error } = await supabase
          .from("options")
          .select()
          .eq("user_id", user.id);

        if (error) {
          console.log(error);
        } else {
          setOptions(data as Option[]);
          console.log(data);
        }
      }
    };

    getOptions();
  }, [user]);

  const [clicked, setClicked] = useState("0");

  useEffect(() => {}, [setClicked]);

  return (
    <Container>
      <div className="h-[3rem] flex justify-end items-center opacity-20 hover:opacity-55 transition-opacity duration-300 ease-in-out">
        <button
          className="hover:bg-lightgray rounded-full cursor-pointer transition-bg duration-300 ease-in-out"
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={handleMouseLeave}
          onClick={handleOpenModal}
        >
          <Image src="/add.png" alt="더하기" width={18} height={18} />
        </button>
      </div>
      <Ul>
        {options.map((option, index) => (
          <Link
            key={index}
            href={`${option.link ? option.link : `/options/${option.id}`}`}
          >
            <Li
              style={{ backgroundColor: option.color }}
              className={`${
                clicked === index.toString() ? "border-2 border-gray" : ""
              }`}
              onClick={() => setClicked(index.toString())}
            >
              {option.name}
            </Li>
          </Link>
        ))}
      </Ul>
      <AddBox className={isHover ? "opacity-100" : "opacity-0"}>추가</AddBox>
      {isOpen && <AddOptionModal onClose={closeModal} />}
    </Container>
  );
}
