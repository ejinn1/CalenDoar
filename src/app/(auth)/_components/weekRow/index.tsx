"use client";

import useModalOpen from "@/hooks/useModalOpen";
import { Event } from "@/store/events";
import useOptionState from "@/store/options";
import { isAfter, isSameDay, isSameOrBefore } from "@/utils/date";
import { useTheme } from "next-themes";
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
  relative w-full h-max rounded-md flex justify-center cursor-pointer
  transition duration-300 ease-in-out md:px-4 px-[0.1rem] py-[0.2rem]
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
  const { theme } = useTheme();

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
                    style={{
                      color: theme === "dark" ? getOptionColor(event) : "",
                    }}
                    className={`md:text-r text-s font-light
                      ${theme !== "dark" && "md:bg-lightgray"}
                    `}
                  >
                    <span
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? ""
                            : getOptionColor(event)
                            ? getOptionColor(event)
                            : "#D3D3D3",
                      }}
                      className="absolute top-0 left-0 md:w-[0.5rem] md:h-full w-full h-full rounded-l rounded-sm md:dark:bg-gray"
                    />
                    <span className="z-[5]">{event.title}</span>
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
