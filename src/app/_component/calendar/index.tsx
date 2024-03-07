"use client";

import useCalendarState from "@/store/calendarDay";
import Image from "next/image";
import { useEffect } from "react";
import tw from "tailwind-styled-components";

const WeekContainer = tw.div`
  grid grid-cols-7
`;

const WeekCell = tw.div`
  w-[3rem] h-[3rem] text-[1.5rem]
  flex justify-center items-center font-semibold
`;

const DayContainer = tw.div`
  w-full h-[calc(100%-7rem)]
  grid grid-cols-7 grid-auto-row
`;

const DayCell = tw.div`
  p-[1rem] text-s font-medium
`;

const ArrowContainer = tw.div`
  flex justify-center items-center opacity-30 cursor-pointer
  hover:opacity-100 transition-opacity duration-300 ease-in-out
`;

export default function Calendar() {
  const now = new Date();
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const { viewDate, days, setDays, goToLeftMonth, goToRightMonth } =
    useCalendarState();

  useEffect(() => {
    setDays(viewDate.getFullYear(), viewDate.getMonth() + 1);
  }, [viewDate, setDays, goToLeftMonth, goToRightMonth]);

  return (
    <div className="bg-white rounded-lg w-full h-full p-[2rem]">
      <aside className="flex w-[15rem] items-center justify-between gap-[2rem]">
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
        </div>
      </aside>
      <WeekContainer>
        {weekdays.map((week, index) => (
          <WeekCell key={index}>{week}</WeekCell>
        ))}
      </WeekContainer>
      <DayContainer>
        {days.map((day, index) => (
          <DayCell key={index} className={`${day !== null ? "shadow-sm" : ""}`}>
            {day ? day.getDate() : ""}
          </DayCell>
        ))}
      </DayContainer>
    </div>
  );
}
