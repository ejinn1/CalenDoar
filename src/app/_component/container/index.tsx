import React from "react";
import tw from "tailwind-styled-components";

interface CardProps {
  children: React.ReactNode;
  size?: "lg" | "md" | "sm";
}

const getSizeStyles = (size: "lg" | "md" | "sm") => {
  switch (size) {
    case "lg":
      return "w-[60rem] min-h-[76rem]";
    case "md":
      return "w-[50rem] min-h-[68rem]";
    case "sm":
      return "w-[40rem] min-h-[58rem]";
    default:
      return "w-[50rem] min-h-[68rem]";
  }
};

const CalendarContainer = tw.div`
  p-5 shadow-md rounded-lg bg-white
  relative
`;

export default function Container({ children, size = "md" }: CardProps) {
  return (
    <CalendarContainer className={`${getSizeStyles(size)}`}>
      {children}
    </CalendarContainer>
  );
}
