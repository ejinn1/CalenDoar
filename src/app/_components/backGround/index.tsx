"use client";

import {
  settingBackGround,
  settingBackGroundDark,
} from "@/constants/optionColor";
import useOptionState from "@/store/options";
import { getOptionIdOfPath } from "@/utils/path";
import { useTheme } from "next-themes";
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

  const { theme } = useTheme();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    const colorValue = options.find(
      (option) => option.id === getOptionIdOfPath(path, options)
    )?.color;

    let colorGroup;

    if (theme === "dark") {
      colorGroup = settingBackGroundDark.find(
        (back) => back.key === colorValue
      );
    } else {
      colorGroup = settingBackGround.find((back) => back.key === colorValue);
    }

    if (!colorGroup) return;
    setFrom(colorGroup.from);
    setTo(colorGroup.to);
  }, [path, options]);

  return (
    <div
      style={{ backgroundImage: `linear-gradient(to right, ${from}, ${to})` }}
      className="w-screen h-screen flex p-[1rem] dark:bg-black"
    >
      {children}
    </div>
  );
}
