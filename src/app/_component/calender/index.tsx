"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { DayCell } from "../dayCell";

const CalendarContainer = tw.div`
  mx-auto mt-5 p-5
  shadow-md rounded-lg
  relative
`;
const CalendarHeader = tw.h1`
  font-semibold text-center text-gray-800 text-xxl
`;
const CalendarGrid = tw.div`
  grid grid-cols-7 gap-4 mt-5
`;

const ArrowButton = tw.button`
  font-bold py-2 px-4 text-l
  rounded inline-flex items-center
  opacity-5 hover:opacity-100
  transition-opacity duration-300 ease-in-out
`;

const WeekdayHeader = tw.div`
  grid grid-cols-7 gap-4 mt-5
`;

function getDaysInMonth(year: number, month: number) {
  const date = new Date(year, month, 1);
  const days: number[] = [];

  const firstDayOfWeek = date.getDay();

  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(0);
  }

  while (date.getMonth() === month) {
    days.push(new Date(date).getDate());
    date.setDate(date.getDate() + 1);
  }

  return days;
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function goToNextMonth() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  }

  function goToPrevMonth() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  }

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setDaysInMonth(getDaysInMonth(year, month));
  }, [currentDate]);

  return (
    <CalendarContainer>
      <div className="absolute top-[30rem] -left-[4rem]">
        <ArrowButton onClick={goToPrevMonth}>
          <Image src="/leftArrow.png" width={24} height={24} alt="<" />
        </ArrowButton>
      </div>
      <h1 className="text-s font-bold">{currentDate.getFullYear()}</h1>
      {/* <h2 className="text-xxs font-regular">
        {months[currentDate.getMonth()]}
      </h2> */}
      <div className="flex items-center justify-end">
        <CalendarHeader>{`${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`}</CalendarHeader>
      </div>
      <WeekdayHeader>
        {weekdays.map((day) => (
          <div
            className="flex justify-center items-center text-xxs font-semibold"
            key={day}
          >
            {day}
          </div>
        ))}
      </WeekdayHeader>
      <CalendarGrid>
        {daysInMonth.map((day, index) => (
          <DayCell key={index} day={day !== 0 ? day : null}></DayCell>
        ))}
      </CalendarGrid>
      <div className="absolute top-[30rem] -right-[4rem]">
        <ArrowButton onClick={goToNextMonth}>
          <Image src="/rightArrow.png" width={24} height={24} alt=">" />
        </ArrowButton>
      </div>
    </CalendarContainer>
  );
}
