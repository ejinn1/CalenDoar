"use client";

import useOptionState from "@/store/options";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import tw from "tailwind-styled-components";

const Container = tw.header`
  group
  relative
  w-full z-10
`;

const Head = tw.div`
  relative
  w-full h-[4rem] rounded-lg px-[2rem]
  flex justify-between items-center
  transition duration-300 ease-in-out
`;

export default function Header() {
  const { selectedOption, options } = useOptionState();
  const { theme, setTheme } = useTheme();

  const [extended, setExtended] = useState(false);
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
      <Head className="bg-white dark:bg-darkgray">
        <Link href={"/"}>
          <div className="text-l font-bold" style={{ color: color }}>
            {title}
          </div>
        </Link>
        <div className="flex gap-[1rem]">
          <div
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="pt-[0.3rem] cursor-pointer opacity-100 hover:opacity-50 transition-opacity duration-300 ease-in-out"
          >
            {theme === "dark" ? (
              <MdLightMode size={14} />
            ) : (
              <MdDarkMode size={14} />
            )}
          </div>
          <div
            onClick={() => setExtended((prev) => !prev)}
            className="cursor-pointer opacity-100 hover:opacity-50 transition-opacity duration-300 ease-in-out"
          >
            {extended ? <IoClose size={20} /> : <IoMenu size={20} />}
          </div>
        </div>
      </Head>
    </Container>
  );
}
