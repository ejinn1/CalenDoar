"use client";

import useOptionState from "@/store/options";
import { getOptionIdOfPath } from "@/utils/path";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import tw from "tailwind-styled-components";

const Container = tw.header`
  group
  w-full z-10
  flex justify-center items-start
`;

const Head = tw.div`
  relative
  w-full rounded-lg px-[2rem] pt-[1rem]
  flex justify-between
  transition duration-300 ease-in-out
`;

export default function Header() {
  const path = usePathname();

  const { options } = useOptionState();
  const { theme, setTheme } = useTheme();

  const [extended, setExtended] = useState(false);
  const [title, setTitle] = useState("Calendoar");
  const [color, setColor] = useState("");

  useEffect(() => {
    const selectedOption = options.find(
      (option) => option.id === getOptionIdOfPath(path, options)
    );

    const optionName = selectedOption?.name;
    const colorValue = selectedOption?.color;

    if (optionName === "전체") {
      setTitle("Calendoar");
      if (theme === "dark") {
        setColor("#efeeee");
      } else {
        setColor("#000000");
      }
    } else {
      optionName && setTitle(optionName);
      if (theme === "dark") {
        colorValue && setColor(colorValue);
      }
    }
  }, [path, options, theme]);

  return (
    <Container>
      {extended && (
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm bg-black/20"></div>
      )}
      <Head
        className={`${
          extended ? "h-[20rem]" : "h-[4rem]"
        } bg-white dark:bg-darkgray`}
      >
        <div className="text-l font-bold" style={{ color: color }}>
          {title}
        </div>
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
