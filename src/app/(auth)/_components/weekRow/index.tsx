"use client";

import useModalOpen from "@/hooks/useModalOpen";
import { Event } from "@/store/events";
import useOptionState from "@/store/options";
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
  relative w-full h-max text-r rounded-sm flex justify-center cursor-pointer
  transition duration-300 ease-in-out px-4
  hover:shadow-md
  dark:hover:shadow-white-md
  hover:text-gray
  dark:hover:text-lightgray
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
  const { options } = useOptionState();

  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [eventDay, setEventDay] = useState<Date>();

  // 이벤트에 맞는 옵션 컬러 반환
  const getOptionColor = (event: Event) => {
    const curOption = options.find((option) => option.id === event.option_id);

    return curOption?.color;
  };
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
                    className="bg-lightgray dark:bg-gray"
                  >
                    <span
                      style={{ backgroundColor: getOptionColor(event) }}
                      className="absolute top-0 left-0 w-[0.5rem] h-full rounded-l rounded-sm dark:bg-gray"
                    />
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
