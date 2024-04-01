"use client";

import { settingBackGround } from "@/constants/optionColor";
import useOptionState from "@/store/options";
import { getOptionIdOfPath } from "@/utils/path";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Prop {
  children: React.ReactNode;
}

export default function BackGround({ children }: Prop) {
  const path = usePathname();

  const { options } = useOptionState();

  const [color, setColor] = useState("#808080");

  useEffect(() => {
    const colorValue = options.find(
      (option) => option.id === getOptionIdOfPath(path, options)
    )?.color;

    console.log(colorValue);

    const backgroundColor = settingBackGround.find(
      (back) => back.key === colorValue
    )?.value;

    console.log(backgroundColor);

    backgroundColor && setColor(backgroundColor);
  }, [path, options]);

  return (
    <div
      style={{ backgroundColor: color }}
      className="pt-[6rem] w-screen h-screen flex gap-[1rem] p-[1rem]"
    >
      {children}
    </div>
  );
}
