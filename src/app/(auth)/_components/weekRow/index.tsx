"use client";

import useModalOpen from "@/hooks/useModalOpen";
import { Event } from "@/store/events";
import { isAfter, isSameDay, isSameOrBefore } from "@/utils/date";
import { useState } from "react";
import tw from "tailwind-styled-components";
import EditEventModal from "../_modal/editEventModal";
import DayCell from "../dayCell";

interface Props {
  days: (Date | null)[];
  events?: Event[];
  selectedDay?: Date;
  setSelectedDay: (day: Date) => void;
  openAdd: () => void;
}

const WeekContainer = tw.div`
  grid grid-cols-7 h-max min-h-[10.2rem]
`;

const EventsContainer = tw.span`
  w-full flex justify-center items-center flex-col gap-2 mt-2
`;

const EventItem = tw.span`
  w-full bg-lightgray h-max text-r rounded-sm flex justify-center cursor-pointer
  transition duration-300 ease-in-out
  hover:shadow-md
  hover:text-gray
`;

export default function WeekRow({
  days,
  events,
  setSelectedDay,
  openAdd,
}: Props) {
  const {
    isOpen: isOpenEdit,
    openModal: openEdit,
    closeModal: closeEdit,
  } = useModalOpen();

  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [eventDay, setEventDay] = useState<Date>();

  return (
    <WeekContainer>
      {days.map((day, index) => (
        <DayCell
          key={index}
          day={day}
          setClickedDay={setSelectedDay}
          onOpen={openAdd}
          className={`${day !== null ? "shadow-sm" : ""}`}
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
                  <EventItem
                    key={eventIndex}
                    onClick={(e) => {
                      e.stopPropagation();

                      setEventDay(day);
                      setSelectedEvent(event);
                      openEdit();
                    }}
                  >
                    {event.title}
                  </EventItem>
                ))}
          </EventsContainer>
        </DayCell>
      ))}
      {isOpenEdit && selectedEvent && eventDay && (
        <EditEventModal
          event={selectedEvent}
          day={eventDay}
          onClose={closeEdit}
        />
      )}
    </WeekContainer>
  );
}
