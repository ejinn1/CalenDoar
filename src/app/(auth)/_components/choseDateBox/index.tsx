"use client";

import useEventScheduler from "@/store/eventCheduler";
import {
  getDaysInMonth,
  isAfter,
  isBefore,
  isSameDay,
  isSameOrBefore,
} from "@/utils/date";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import tw from "tailwind-styled-components";

interface Prop {
  clickedDate: Date;
  startDate: Date;
  endDate: Date;
  onClose: () => void;
}

const WeekdayContainer = tw.div`
  grid grid-cols-7 gap-2
`;

const WeekCell = tw.div`
  w-[3rem] h-[3rem] text-m font-bold
  flex justify-center items-center
`;

const DayContainer = tw.div`
  grid grid-cols-7 gap-2
`;

const DayCell = tw.div`
  w-[3rem] h-[3rem] rounded-full text-m font-semibold
  flex justify-center items-center cursor-pointer
  transition-bg duration-200 ease-in-out
  hover:bg-lightgray
`;

const ArrowContainer = tw.div`
  flex justify-center items-center opacity-30 cursor-pointer
  hover:opacity-100 transition-opacity duration-300 ease-in-out
`;

export default function ChoseDateBox({ onClose, clickedDate }: Prop) {
  const now = new Date();
  const [days, setDays] = useState(
    getDaysInMonth(clickedDate.getFullYear(), clickedDate.getMonth())
  );
  const [viewDate, setViewDate] = useState(clickedDate);
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  const { startDate, setStartDate, endDate, setEndDate } = useEventScheduler();
  const [isFirst, setIsfirst] = useState(true);

  const handleCalcChoseDate = (day: Date) => {
    if (isBefore(day, startDate) && isBefore(day, endDate)) {
      setStartDate(day);
      setIsfirst(true);
    } else if (isAfter(day, startDate) && isBefore(day, endDate)) {
      if (isFirst) {
        setEndDate(day);
        setIsfirst(false);
      } else {
        setStartDate(day);
        setIsfirst(true);
      }
    } else if (isAfter(day, startDate) && isSameOrBefore(day, endDate)) {
      if (isFirst) {
        setStartDate(day);
        setIsfirst(false);
      } else {
        setEndDate(day);
        setIsfirst(true);
      }
    } else {
      setEndDate(day);
      setIsfirst(true);
    }
  };

  return (
    <div className="absolute top-[4rem] left-[1rem] shadow-md w-[30rem] h-[33rem] bg-white border-2 border-lightgray rounded-lg p-2">
      <div className="relative w-full h-full">
        <header className="flex px-[1rem] justify-between items-center">
          <div className="h-[4rem] text-l font-bold flex items-center justify-center">
            {`${viewDate.getFullYear()}.${(viewDate.getMonth() + 1)
              .toString()
              .padStart(2, "0")}`}
          </div>
          <div className="flex gap-[1rem] items-center">
            <ArrowContainer>
              <IoIosArrowBack
                size={20}
                onClick={() => {
                  const prevMonth = new Date(
                    viewDate.getFullYear(),
                    viewDate.getMonth() - 1,
                    1
                  );
                  const days = getDaysInMonth(
                    prevMonth.getFullYear(),
                    prevMonth.getMonth()
                  );
                  setDays(days);
                  setViewDate(prevMonth);
                }}
              />
            </ArrowContainer>
            <ArrowContainer>
              <IoIosArrowForward
                size={20}
                onClick={() => {
                  const nextMonth = new Date(
                    viewDate.getFullYear(),
                    viewDate.getMonth() + 1,
                    1
                  );
                  const days = getDaysInMonth(
                    nextMonth.getFullYear(),
                    nextMonth.getMonth()
                  );
                  setDays(days);
                  setViewDate(nextMonth);
                }}
              />
            </ArrowContainer>
          </div>
        </header>
        <WeekdayContainer>
          {weekdays.map((day, index) => (
            <WeekCell
              key={index}
              className={
                index === 0 || index === 6 ? "text-lightgray" : "text-gray"
              }
            >
              {day}
            </WeekCell>
          ))}
        </WeekdayContainer>
        <DayContainer>
          {days.map((day, index) => (
            <DayCell
              key={index}
              onClick={() => {
                day && handleCalcChoseDate(day);
              }}
              className={`${
                day?.getDay() === 0 || day?.getDay() === 6 ? "text-gray" : ""
              } ${day && isSameDay(day, now) ? "text-lightred" : ""}
                ${
                  day && isSameDay(day, startDate)
                    ? "bg-lightblue text-white"
                    : ""
                }
                ${
                  day && isSameDay(day, endDate)
                    ? "bg-lightblue text-white"
                    : ""
                }
              `}
            >
              {day ? day.getDate() : ""}
            </DayCell>
          ))}
        </DayContainer>
        <div className="flex justify-end w-full absolute bottom-0 right-0">
          <button
            onClick={onClose}
            className="px-[1rem] py-[0.6rem] border-[0.1rem] rounded-lg bg-lightblue text-white text-m font-semibold"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
