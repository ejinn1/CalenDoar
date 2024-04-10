"use client";

import useCalendarState from "@/store/calendarDay";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import tw from "tailwind-styled-components";
import ContentsBox from "../contentsBox";

interface Prop {
  children: React.ReactNode;
}

const WeekContainer = tw.div`
  grid grid-cols-7
`;

const WeekCell = tw.div`
  w-full h-[3rem] text-[1.2rem] pl-[0.9rem]
  flex justify-start items-center font-semibold
`;

const ArrowContainer = tw.div`
  flex justify-center items-center cursor-pointer rounded-lg
  hover:bg-lightgray dark:hover:bg-gray
  transition duration-300 ease-in-out
`;

const TodayContainer = tw.div`
  ml-2 flex justify-center items-center text-r p-[1rem]
  border-2 rounded-lg p-2 border-lightgray border-dotted dark:border-gray
  cursor-pointer
  hover:bg-lightgray
  dark:hover:bg-gray
  transition-bg duration-300 ease-in-out
`;

export default function Calendar({ children }: Prop) {
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const { viewDate, goToLeftMonth, goToRightMonth, goToTodayMonth } =
    useCalendarState();

  return (
    <ContentsBox>
      <header className="relative flex w-[20rem] items-center justify-between gap-[2rem]">
        <div className="h-[4rem] pl-[0.7rem] text-xl font-bold flex items-center justify-center">{`${viewDate.getFullYear()}.${(
          viewDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}`}</div>
        <div className="flex">
          <ArrowContainer onClick={goToLeftMonth}>
            <IoIosArrowBack size={20} />
          </ArrowContainer>
          <ArrowContainer onClick={goToRightMonth}>
            <IoIosArrowForward size={20} />
          </ArrowContainer>
          <TodayContainer onClick={goToTodayMonth}>오늘</TodayContainer>
        </div>
      </header>
      <WeekContainer>
        {weekdays.map((week, index) => (
          <WeekCell key={index} className={index === 0 ? "text-lightred" : ""}>
            {week}
          </WeekCell>
        ))}
      </WeekContainer>
      {children}
    </ContentsBox>
  );
}
