"use client";

import useOptionState from "@/store/options";
import { getOptionIdOfPath } from "@/utils/path";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import tw from "tailwind-styled-components";

const Container = tw.header`
  group
  fixed top-0 left-0 w-full px-[1rem] pt-[1rem] z-10 h-[8rem]
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

  const [extended, setExtended] = useState(false);
  const [color, setColor] = useState("#D3D3D3");
  const [title, setTitle] = useState("Calendoar");

  useEffect(() => {
    const selectedOption = options.find(
      (option) => option.id === getOptionIdOfPath(path, options)
    );
    const backgroundColor = selectedOption?.color;
    const optionName = selectedOption?.name;
    backgroundColor && setColor(backgroundColor);
    if (optionName === "전체") {
      setTitle("Calendoar");
    } else {
      optionName && setTitle(optionName);
    }
  }, [path, options]);

  return (
    <Container>
      {extended && (
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm bg-black/20 "></div>
      )}
      <Head
        className={`${extended ? "h-[20rem]" : "h-[4rem]"}`}
        style={{ backgroundColor: color }}
      >
        <div className="text-l font-bold">{title}</div>
        <div className="flex">
          <div
            onClick={() => setExtended((prev) => !prev)}
            className={`cursor-pointer opacity-100 hover:opacity-50 transition-opacity duration-300 ease-in-out`}
          >
            {extended ? <IoClose size={20} /> : <IoMenu size={20} />}
          </div>
        </div>
      </Head>
    </Container>
  );
}
