"use client";

import { isSameDay } from "@/utils/date";
import { IoIosAdd } from "react-icons/io";
import tw from "tailwind-styled-components";

interface Props {
  children: React.ReactNode;
  className: string;
  day: Date | null;
  onOpen: () => void;
  setClickedDay: (day: Date) => void;
}

const Cell = tw.div`
  group
  relative p-[0.5rem] font-medium text-r
`;

const TopDiv = tw.div`
  flex w-full justify-between items-center
`;

const DayContainer = tw.span`
  flex justify-center items-center rounded-full w-[1.7rem] h-[1.7rem]
  transition-bg duration-300 ease-in-out
  hover:bg-lightgray
`;

const AddContainer = tw.span`
  opacity-0 flex items-center gap-[1rem] pr-2
  group-hover:opacity-100
  transition-opacity duration-300 ease-in-out
  group-hover:translate-x-2
`;

export default function DayCell({
  children,
  className,
  day,
  onOpen,
  setClickedDay,
}: Props) {
  const now = new Date();

  // 빈 칸일 때
  if (!day) {
    return <Cell />;
  }

  return (
    <Cell
      onClick={() => {
        if (day) {
          setClickedDay(day);
          onOpen();
        }
      }}
      className={`${className}`}
    >
      <TopDiv>
        <DayContainer
          className={`${
            day && isSameDay(now, day) && now.getDate() === day?.getDate()
              ? "bg-lightred text-white"
              : ""
          } ${day?.getDay() === 0 ? "text-lightred" : ""}`}
        >
          {day ? day.getDate() : ""}
        </DayContainer>
        <AddContainer>
          <IoIosAdd size={16} />
        </AddContainer>
      </TopDiv>
      {children}
    </Cell>
  );
}
