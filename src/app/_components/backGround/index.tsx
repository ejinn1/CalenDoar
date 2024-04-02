"use client";

import { settingBackGround } from "@/constants/optionColor";
import useOptionState from "@/store/options";
import { getOptionIdOfPath } from "@/utils/path";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

interface Prop {
  children: React.ReactNode;
}

const Back = tw.div;

export default function BackGround({ children }: Prop) {
  const path = usePathname();

  const { options } = useOptionState();

  const [color, setColor] = useState("#808080");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    const colorValue = options.find(
      (option) => option.id === getOptionIdOfPath(path, options)
    )?.color;

    const colorGroup = settingBackGround.find(
      (back) => back.key === colorValue
    );

    console.log(colorGroup);
    if (!colorGroup) return;
    setFrom(colorGroup.from);
    setTo(colorGroup.to);

    // const gradient = `bg-gradient-to-tr from-[${colorGroup?.from}] via-[${colorGroup?.via}] to-[${colorGroup?.to}]`;

    // console.log(backgroundColor);

    // gradient && setColor(gradient);
  }, [path, options]);

  return (
    <div
      style={{ backgroundImage: `linear-gradient(to right, ${from}, ${to})` }}
      className="pt-[6rem] w-screen h-screen flex gap-[1rem] p-[1rem]"
    >
      {children}
    </div>
  );
}
