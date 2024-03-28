"use client";

import AddOptionModal from "@/app/(auth)/_components/addOptionModal";
import useModalOpen from "@/hooks/useModalOpen";
import { createClient } from "@/libs/supabase/client";
import useOptionState, { Option } from "@/store/options";
import { getOptionIdOfPath } from "@/utils/path";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

const Container = tw.nav`
  w-[16rem] bg-white rounded-lg h-full flex flex-col p-[1rem] gap-[1rem]
`;

const Ul = tw.ul`
  flex flex-col gap-[1rem] w-full
`;

const Li = tw.li`
  w-full h-[3.5rem] bg-lightgray rounded-lg font-semibold text-r
  flex justify-center items-center
`;

const SkeletonLi = tw.li`
  w-full h-[3.5rem] bg-lightgray rounded-lg font-semibold
  animate-pulse
`;

const AddBox = tw.div`
  w-full h-[4rem] border-lightgray border-2 border-dotted rounded-lg
  transition-opcatity duration-300 ease-in-out
  flex justify-center items-center font-bold
`;

export default function OptionBox() {
  const supabase = createClient();
  const path = usePathname();

  const { isOpen, openModal, closeModal } = useModalOpen();
  const { options, setOptions, isUpdate } = useOptionState();

  const [isHover, setIsHover] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [clickedOption, setClickedOption] = useState(
    getOptionIdOfPath(path, options)
  );

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
    setClickedOption(getOptionIdOfPath(path, options));
  }, [path]);

  useEffect(() => {
    handleMouseLeave();
  }, [isOpen, handleMouseLeave]);

  useEffect(() => {
    const getOptions = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("options")
        .select()
        .eq("user_id", user.id);

      if (error) {
        console.log(error);
      } else {
        setOptions(data as Option[]);
        setIsLoading(false);
      }
    };

    getOptions();
  }, [path, isUpdate]);

  return (
    <Container className="overflow-scroll">
      <div className="h-[3rem] w-full flex justify-end items-center opacity-20 hover:opacity-55 transition-opacity duration-300 ease-in-out">
        <button
          className="hover:bg-lightgray rounded-full cursor-pointer transition-bg duration-300 ease-in-out"
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={handleMouseLeave}
          onClick={handleOpenModal}
        >
          <Image src="/add.png" alt="더하기" width={16} height={16} />
        </button>
      </div>
      {isLoading ? (
        <Ul>
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonLi key={index} />
          ))}
        </Ul>
      ) : (
        <Ul>
          {options.map((option, index) => (
            <Link
              key={index}
              href={`${option.link ? option.link : `/options/${option.id}`}`}
            >
              <Li
                style={{ backgroundColor: option.color }}
                className={`${
                  clickedOption === option.id ? "border-2 border-gray" : ""
                }`}
                onClick={() => setClickedOption(option.id)}
              >
                {option.name}
              </Li>
            </Link>
          ))}
        </Ul>
      )}
      <AddBox className={isHover ? "opacity-100" : "opacity-0"}>추가</AddBox>
      {isOpen && <AddOptionModal onClose={closeModal} />}
    </Container>
  );
}
