import useCalendarState from "@/store/calendarDay";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import DayCell from "../dayCell";

const Container = tw.div`
  w-full h-[calc(100%-7rem)]
  grid grid-cols-7 grid-auto-row
`;

export default function DayContainer() {
  const now = new Date();
  const {
    viewDate,
    days,
    setDays,
    goToLeftMonth,
    goToRightMonth,
    goToTodayMonth,
  } = useCalendarState();
  const [toDayCheck, setToDayCheck] = useState(true);

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
    <Container>
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
    </Container>
  );
}
