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
  group
  relative w-full h-[calc(100%-8rem)] bg-white dark:bg-darkgray rounded-lg flex flex-col p-[1rem] gap-[1rem]
  transition-bg duration-300 ease-in-out
`;

const Ul = tw.ul`
  flex flex-col gap-[1rem] w-full h-full items-center
`;

const Li = tw.li`
  w-full min-h-[3.5rem] bg-lightgray rounded-lg font-semibold text-r
  flex justify-center items-center
`;

const SkeletonLi = tw.li`
  w-full h-[3.5rem] bg-lightgray rounded-lg font-semibold
  animate-pulse
`;

export default function OptionBox() {
  const supabase = createClient();

  const { isOpen, openModal, closeModal } = useModalOpen();
  const { selectedOption, setSelectedOption, options, setOptions, isUpdate } =
    useOptionState();
  const { theme } = useTheme();

  const [isLoading, setIsLoading] = useState(true);

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
    <Container>
      <div className="h-[3rem] w-full flex justify-between items-center opacity-20 group-hover:opacity-55 transition-opacity duration-300 ease-in-out">
        <button className="hover:bg-lightgray dark:hover:bg-gray p-1 rounded-full cursor-pointer transition-bg duration-300 ease-in-out">
          <IoIosSettings
            size={20}
            color={`${theme === "dark" ? "#D3D3D3" : "#232323"} `}
          />
        </button>
        <button
          className="hover:bg-lightgray dark:hover:bg-gray rounded-full cursor-pointer transition-bg duration-300 ease-in-out"
          onClick={openModal}
        >
          <IoIosAdd
            size={24}
            color={`${theme === "dark" ? "#D3D3D3" : "#232323"} `}
          />
        </button>
      </div>
      <div className="h-full overflow-scroll">
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
                onClick={() => setSelectedOption(option)}
              >
                {option.name}
              </Li>
            ))}
          </Ul>
        )}
      </div>
      {isOpen && <AddOptionModal onClose={closeModal} />}
    </Container>
  );
}
