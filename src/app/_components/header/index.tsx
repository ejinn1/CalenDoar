"use client";

import useModalOpen from "@/hooks/useModalOpen";
import useOptionState from "@/store/options";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import tw from "tailwind-styled-components";
import Menu from "../menu";

const Container = tw.header`
  group
  relative
  w-full z-10
`;

const Head = tw.div`
  relative
  w-full h-[4rem]
  flex justify-between items-center gap-[1rem]
  transition duration-300 ease-in-out
`;

export default function Header() {
  const { selectedOption, options } = useOptionState();
  const { theme, setTheme } = useTheme();
  const {
    isOpen: isOpenMenu,
    closeModal: closeMenu,
    openModal: openMenu,
  } = useModalOpen();

  const [title, setTitle] = useState("Calendoar");
  const [color, setColor] = useState("");

  useEffect(() => {
    const optionName = selectedOption.name;
    const colorValue = selectedOption.color;

    if (optionName === "전체") {
      setTitle("Calendoar");
      if (theme === "dark") {
        setColor(colorValue);
      } else {
        setColor("#000000");
      }
    } else {
      setTitle(optionName);
      if (theme === "dark") {
        setColor(colorValue);
      } else {
        setColor("#000000");
      }
    }
  }, [options, theme, selectedOption]);

  return (
    <Container>
      <Head>
        <Link href={"/"}>
          <div
            className="flex justify-center items-center text-l font-bold bg-white dark:bg-darkgray w-[14rem] h-[4rem] px-[2rem] rounded-lg shadow-md"
            style={{ color: color }}
          >
            {title}
          </div>
        </Link>
        <div className="relative flex items-center justify-end gap-[1rem] w-full bg-white dark:bg-darkgray h-[4rem] px-[2rem] rounded-lg shadow-md">
          {/* <div onClick={handleLogout}>
            <IoLogOut size={16} />
          </div> */}
          <div
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className=" cursor-pointer opacity-100 hover:opacity-50 transition-opacity duration-300 ease-in-out"
          >
            {theme === "dark" ? (
              <MdLightMode size={14} />
            ) : (
              <MdDarkMode size={14} />
            )}
          </div>
          <div
            onClick={isOpenMenu ? closeMenu : openMenu}
            className="cursor-pointer opacity-100 hover:opacity-50 transition-opacity duration-300 ease-in-out"
          >
            {isOpenMenu ? <IoClose size={20} /> : <IoMenu size={20} />}
          </div>
        </div>
      </Head>
      {isOpenMenu && <Menu />}
    </Container>
  );
}
