"use client";

import useCalendarState from "@/store/calendarDay";
import Image from "next/image";
import tw from "tailwind-styled-components";

interface Prop {
  children: React.ReactNode;
}

const WeekContainer = tw.aside`
  grid grid-cols-7
`;

const WeekCell = tw.div`
  w-full h-[3rem] text-[1.5rem] pl-[1.2rem]
  flex justify-start items-center font-semibold
`;

const ArrowContainer = tw.div`
  flex justify-center items-center opacity-30 cursor-pointer
  hover:opacity-100 transition-opacity duration-300 ease-in-out
`;

const TodayContainer = tw.div`
  w-[4rem] ml-2 flex justify-center items-center
  border-2 rounded-lg p-2 border-lightgray border-dotted
  cursor-pointer
  hover:bg-lightgray transition-bg duration-300 ease-in-out
`;

export default function Calendar({ children }: Prop) {
  const now = new Date();

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const { viewDate, goToLeftMonth, goToRightMonth, goToTodayMonth } =
    useCalendarState();

  return (
    <div className="bg-white rounded-lg w-full h-full p-[2rem]">
      <header className="flex w-[20rem] items-center justify-between gap-[2rem]">
        <h1 className="h-[4rem] text-l font-bold flex items-center justify-center">{`${viewDate.getFullYear()}.${(
          viewDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}`}</h1>
        <div className="flex">
          <ArrowContainer onClick={goToLeftMonth}>
            <Image
              src="/leftArrow.png"
              alt="왼쪽 화살표"
              width={16}
              height={16}
            />
          </ArrowContainer>
          <ArrowContainer onClick={goToRightMonth}>
            <Image
              src="/rightArrow.png"
              alt="왼쪽 화살표"
              width={16}
              height={16}
            />
          </ArrowContainer>
          <TodayContainer onClick={goToTodayMonth}>오늘</TodayContainer>
        </div>
      </header>
      <WeekContainer>
        {weekdays.map((week, index) => (
          <WeekCell key={index}>{week}</WeekCell>
        ))}
      </WeekContainer>
      {children}
    </div>
  );
}
