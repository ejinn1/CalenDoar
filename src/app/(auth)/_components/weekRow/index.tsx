"use client";

import { Event } from "@/store/events";
import { isAfter, isSameDay, isSameOrBefore } from "@/utils/date";
import tw from "tailwind-styled-components";
import DayCell from "../dayCell";

interface Props {
  days: (Date | null)[];
  events?: Event[];
  selectedDay?: Date;
  setSelectedDay: (day: Date) => void;
  onOpen: () => void;
}

const WeekContainer = tw.div`
  grid grid-cols-7 h-max min-h-[10.2rem]
`;

const EventsContainer = tw.span`
  w-full flex justify-center items-center flex-col gap-2 mt-2
`;

export default function WeekRow({
  days,
  events,
  selectedDay,
  setSelectedDay,
  onOpen,
}: Props) {
  return (
    <WeekContainer>
      {days.map((day, index) => (
        <DayCell
          key={index}
          day={day}
          setClickedDay={setSelectedDay}
          onOpen={onOpen}
          className={`${day !== null ? "shadow-sm cursor-pointer" : ""}`}
        >
          <EventsContainer>
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
                    className="w-full bg-lightgray h-max text-r rounded-sm flex justify-center text-black"
                  >
                    {event.title}
                  </span>
                ))}
          </EventsContainer>
        </DayCell>
      ))}
    </WeekContainer>
  );
}
