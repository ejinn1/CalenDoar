"use client";

import AddOptionModal from "@/app/(auth)/_components/_modal/addOptionModal";
import EditOptionModal from "@/app/(auth)/_components/_modal/editOptionModal";
import { OPTION_ALL_ID } from "@/constants/optionID";
import useModalOpen from "@/hooks/useModalOpen";
import { createClient } from "@/libs/supabase/client";
import useOptionState from "@/store/options";
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

  const {
    isOpen: isOpenAdd,
    openModal: openAdd,
    closeModal: closeAdd,
  } = useModalOpen();
  const {
    isOpen: isOpenEdit,
    openModal: openEdit,
    closeModal: closeEdit,
  } = useModalOpen();
  const {
    allOption,
    selectedOption,
    setSelectedOption,
    options,
    setOptions,
    isUpdate,
  } = useOptionState();
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
        setOptions(data);
        setIsLoading(false);
      }
    };

    getOptions();
  }, [isUpdate]);

  useEffect(() => {
    const pick = options.find((option) => option.id === selectedOption.id);
    pick && setSelectedOption(pick);
  }, [options]);

  return (
    <Container>
      <div className="h-[3rem] w-full flex justify-between items-center opacity-20 group-hover:opacity-55 transition-opacity duration-300 ease-in-out">
        <button
          onClick={() => selectedOption.id !== OPTION_ALL_ID && openEdit()}
          className="hover:bg-lightgray dark:hover:bg-gray p-1 rounded-full cursor-pointer transition-bg duration-300 ease-in-out"
        >
          <IoIosSettings
            size={20}
            color={`${theme === "dark" ? "#D3D3D3" : "#232323"} `}
          />
        </button>
        <button
          className="hover:bg-lightgray dark:hover:bg-gray rounded-full cursor-pointer transition-bg duration-300 ease-in-out"
          onClick={openAdd}
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
            <Li
              key={allOption.id}
              style={{
                backgroundColor: theme === "dark" ? "#232323" : allOption.color,
                color: theme === "dark" ? allOption.color : "",
              }}
              className={`${
                selectedOption.id === allOption.id ? "border-2 border-gray" : ""
              }
                  dark:hover:border-2
                 dark:hover:border-gray
                `}
              onClick={() => setSelectedOption(allOption)}
            >
              {allOption.name}
            </Li>
            {options.map((option, index) => {
              return (
                <Li
                  key={index}
                  style={{
                    backgroundColor:
                      theme === "dark" ? "#232323" : option.color,
                    color: theme === "dark" ? option.color : "",
                  }}
                  className={`${
                    selectedOption.id === option.id
                      ? "border-2 border-gray"
                      : ""
                  }
                  dark:hover:border-2
                 dark:hover:border-gray
                `}
                  onClick={() => setSelectedOption(option)}
                >
                  {option.name}
                </Li>
              );
            })}
          </Ul>
        )}
      </div>
      {isOpenAdd && <AddOptionModal onClose={closeAdd} />}
      {isOpenEdit && (
        <EditOptionModal onClose={closeEdit} pickedOption={selectedOption} />
      )}
    </Container>
  );
}
