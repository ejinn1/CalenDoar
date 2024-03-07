"use client";

import useCalendarState from "@/store/calendarDay";
import Image from "next/image";
import { useEffect, useState } from "react";
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

const TodayContainer = tw.div`
  w-[4rem] ml-2 flex justify-center items-center
  border-2 rounded-lg p-2 border-lightgray border-dotted
  cursor-pointer
  hover:bg-lightgray transition-bg duration-300 ease-in-out
`;

export default function Calendar() {
  const now = new Date();
  const [toDayCheck, setToDayCheck] = useState(true);
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const {
    viewDate,
    days,
    setDays,
    goToLeftMonth,
    goToRightMonth,
    goToTodayMonth,
  } = useCalendarState();

  useEffect(() => {
    setDays(viewDate.getFullYear(), viewDate.getMonth());
    if (
      now.getMonth() === viewDate.getMonth() &&
      now.getFullYear() === viewDate.getFullYear()
    ) {
      setToDayCheck(true);
    } else {
      setToDayCheck(false);
    }
  }, [viewDate, setDays, goToLeftMonth, goToRightMonth, goToTodayMonth]);

  return (
    <div className="bg-white rounded-lg w-full h-full p-[2rem]">
      <aside className="flex w-[20rem] items-center justify-between gap-[2rem]">
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
      </aside>
      <WeekContainer>
        {weekdays.map((week, index) => (
          <WeekCell key={index}>{week}</WeekCell>
        ))}
      </WeekContainer>
      <DayContainer>
        {days.map((day, index) => (
          <DayCell key={index} className={`${day !== null ? "shadow-sm" : ""}`}>
            <span
              className={`flex justify-center items-center rounded-full w-[2rem] h-[2rem] ${
                toDayCheck && now.getDate() === day?.getDate()
                  ? "bg-red-400 text-white"
                  : ""
              }`}
            >
              {day ? day.getDate() : ""}
            </span>
          </DayCell>
        ))}
      </DayContainer>
    </div>
  );
}
