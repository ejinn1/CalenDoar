"use client";

import AddOptionModal from "@/app/(auth)/_components/_modal/addOptionModal";
import useModalOpen from "@/hooks/useModalOpen";
import { createClient } from "@/libs/supabase/client";
import useOptionState, { Option } from "@/store/options";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoIosAdd, IoIosSettings } from "react-icons/io";
import tw from "tailwind-styled-components";

const Container = tw.nav`
  w-full bg-white rounded-lg h-full flex flex-col p-[1rem] gap-[1rem]
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
  w-full h-[4rem] border-lightgray dark:border-gray border-2 border-dotted rounded-lg
  transition-opcatity duration-300 ease-in-out
  flex justify-center items-center font-bold
`;

export default function OptionBox() {
  const supabase = createClient();
  // const path = usePathname();

  const { isOpen, openModal, closeModal } = useModalOpen();
  const { selectedOption, setSelectedOption, options, setOptions, isUpdate } =
    useOptionState();

  const [isHover, setIsHover] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { theme } = useTheme();

  const handleOpenModal = () => {
    openModal();
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    if (!isOpen) {
      setIsHover(false);
    }
  };

  // useEffect(() => {
  //   setClickedOption(getOptionIdOfPath(path, options));
  // }, [path]);

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
  }, [isUpdate]);

  return (
    <Container className="group overflow-scroll dark:bg-darkgray">
      <div className="h-[3rem] w-full flex justify-between items-center opacity-20 group-hover:opacity-55 transition-opacity duration-300 ease-in-out">
        <button className="hover:bg-lightgray dark:hover:bg-gray p-1 rounded-full cursor-pointer transition-bg duration-300 ease-in-out">
          <IoIosSettings
            size={20}
            color={`${theme === "dark" ? "#D3D3D3" : "#232323"} `}
          />
        </button>
        <button
          className="hover:bg-lightgray dark:hover:bg-gray rounded-full cursor-pointer transition-bg duration-300 ease-in-out"
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={handleMouseLeave}
          onClick={handleOpenModal}
        >
          <IoIosAdd
            size={24}
            color={`${theme === "dark" ? "#D3D3D3" : "#232323"} `}
          />
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
            <Li
              key={index}
              style={{
                backgroundColor: theme === "dark" ? "#232323" : option.color,
                color: theme === "dark" ? option.color : "",
              }}
              className={`${
                selectedOption.id === option.id ? "border-2 border-gray" : ""
              }
                  dark:hover:border-2
                 dark:hover:border-gray
                `}
              onClick={() => {
                setSelectedOption(option);

                console.log(option.name);
              }}
            >
              {option.name}
            </Li>
          ))}
        </Ul>
      )}
      <AddBox className={isHover ? "opacity-100" : "opacity-0"}>추가</AddBox>
      {isOpen && <AddOptionModal onClose={closeModal} />}
    </Container>
  );
}
