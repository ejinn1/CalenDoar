"use client";

import { settingBackGround } from "@/constants/optionColor";
import useOptionState from "@/store/options";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

interface Prop {
  children: React.ReactNode;
}

const Back = tw.div;

export default function BackGround({ children }: Prop) {
  const { options } = useOptionState();

  const { theme } = useTheme();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const { selectedOption } = useOptionState();

  useEffect(() => {
    let colorGroup;

    if (theme !== "dark") {
      colorGroup = settingBackGround.find(
        (back) => back.key === selectedOption.color
      );
    }

    if (!colorGroup) return;
    setFrom(colorGroup.from);
    setTo(colorGroup.to);
  }, [options, selectedOption, theme]);

  // 다크 모드
  if (theme === "dark") {
    return (
      <div className="w-screen h-screen flex p-[1rem] dark:bg-black">
        {children}
      </div>
    );
  }

  // 라이트 모드
  return (
    <div
      style={{ backgroundImage: `linear-gradient(to right, ${from}, ${to})` }}
      className="w-screen h-screen flex p-[1rem] dark:bg-black"
    >
      {children}
    </div>
  );
}
