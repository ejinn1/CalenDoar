import tw from "tailwind-styled-components";

const WeekdayContainer = tw.div`
  grid grid-cols-7
`;

const Weekday = tw.div`
  w-[3rem] h-[3rem]
  flex justify-center items-center font-bold
`;

const DayContainer = tw.div`
  grid grid-cols-7 gap-2
`;

const DayCell = tw.div`
  w-[2rem] h-[2rem] rounded-full
  flex justify-center items-center
`;

function getDaysInMonth(year: number, month: number) {
  let date = new Date(year, month, 1);
  let days = [];

  for (let i = 0; i < date.getDay(); i++) {
    days.push(null);
  }

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export default function MiniCalendar() {
  const now = new Date();
  const days = getDaysInMonth(now.getFullYear(), now.getMonth());
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="flex flex-col rounded-lg bg-white p-[1rem] w-[20rem]">
      <WeekdayContainer>
        {weekdays.map((day, index) => (
          <Weekday
            key={index}
            className={index === 0 || index === 6 ? "text-lightgray" : ""}
          >
            {day}
          </Weekday>
        ))}
      </WeekdayContainer>
      <DayContainer>
        {days.map((day, index) => (
          <DayCell
            key={index}
            className={`${
              day?.getDay() === 0 || day?.getDay() === 6 ? "text-lightgray" : ""
            } ${
              now.getDate() === day?.getDate() ? "bg-red-500 text-white" : ""
            }`}
          >
            {day ? day.getDate() : ""}
          </DayCell>
        ))}
      </DayContainer>
    </div>
  );
}
