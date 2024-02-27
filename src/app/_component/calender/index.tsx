"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Container from "../container";
import { DayCell } from "../dayCell";

const CalendarHeader = tw.h1`
  font-semibold text-center text-gray-800 text-xxl
  transition duration-100 ease-linear
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

const SkeletonDayCell = tw.div`
  w-[6rem] h-[8rem]
  animate-pulse bg-lightgray rounded
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
  const [isLoading, setIsLoading] = useState(true);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

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
    setIsLoading(false);
  }, [currentDate, setDaysInMonth]);

  return (
    <Container>
      <div className="absolute top-[30rem] -left-[4rem]">
        <ArrowButton onClick={goToPrevMonth}>
          <Image src="/leftArrow.png" width={24} height={24} alt="<" />
        </ArrowButton>
      </div>
      <h1 className="text-s font-bold text-lightgray">
        {currentDate.getFullYear()}
      </h1>
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
        {isLoading
          ? Array.from({ length: 35 }).map((_, index) => (
              <SkeletonDayCell key={index}></SkeletonDayCell>
            ))
          : daysInMonth.map((day, index) => (
              <DayCell key={index} day={day !== 0 ? day : null}></DayCell>
            ))}
      </CalendarGrid>
      <div className="absolute top-[30rem] -right-[4rem]">
        <ArrowButton onClick={goToNextMonth}>
          <Image src="/rightArrow.png" width={24} height={24} alt=">" />
        </ArrowButton>
      </div>
    </Container>
  );
}
