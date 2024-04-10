"use client";

import { settingBackGround } from "@/constants/optionColor";
import useOptionState from "@/store/options";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface Prop {
  children: React.ReactNode;
}

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

  return (
    <div
      style={{
        backgroundImage:
          theme === "dark" ? "" : `linear-gradient(to right, ${from}, ${to})`,
      }}
      className="w-screen h-screen flex p-[1rem] dark:bg-black"
    >
      {children}
    </div>
  );
}
