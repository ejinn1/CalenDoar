import { getDaysInMonth } from "@/utils/date";
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

export default function Calendar() {
  const now = new Date();
  const days = getDaysInMonth(now.getFullYear(), now.getMonth());
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="bg-white rounded-lg w-full h-full p-[2rem]">
      <h1 className="h-[4rem] text-l font-bold">{`${now.getFullYear()}.${(
        now.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`}</h1>

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
