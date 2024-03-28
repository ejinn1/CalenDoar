"use client";

import { Event } from "@/store/events";
import { isAfter, isSameDay, isSameOrBefore } from "@/utils/date";
import DayCell from "../dayCell";

interface Props {
  days: (Date | null)[];
  events?: Event[];
  setClickedDay: (day: Date) => void;
  onOpen: () => void;
  toDayCheck: boolean;
}

export default function WeekRow({
  days,
  events,
  setClickedDay,
  onOpen,
  toDayCheck,
}: Props) {
  const now = new Date();

  return (
    <div className="grid grid-cols-7 h-max min-h-[10.2rem]">
      {days.map((day, index) => (
        <DayCell
          key={index}
          day={day}
          setClickedDay={setClickedDay}
          onOpen={onOpen}
          className={`${day !== null ? "shadow-sm cursor-pointer" : ""} ${
            day?.getDay() === 0 ? "text-lightred" : ""
          }`}
        >
          <span
            className={`flex justify-center items-center rounded-full w-[1.7rem] h-[1.7rem] ${
              toDayCheck && now.getDate() === day?.getDate()
                ? "bg-lightred text-white"
                : ""
            }`}
          >
            {day ? day.getDate() : ""}
          </span>
          <span className="w-full flex justify-center items-center flex-col gap-2 mt-2">
            {day &&
              events &&
              events
                .filter((event: Event) => {
                  const eventStart = new Date(event.start_date);
                  const eventEnd = new Date(event.end_date);
                  return (
                    isSameDay(eventStart, day) ||
                    (isAfter(day, eventStart) && isSameOrBefore(day, eventEnd))
                  );
                })
                .map((event: Event, eventIndex: number) => (
                  <span
                    key={eventIndex}
                    className="w-full bg-lightgray h-max text-r rounded-sm flex justify-center"
                  >
                    {event.title}
                  </span>
                ))}
          </span>
        </DayCell>
      ))}
    </div>
  );
}
