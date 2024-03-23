import useModalOpen from "@/hooks/useModalOpen";
import { createClient } from "@/libs/supabase/client";
import useCalendarState from "@/store/calendarDay";
import useOptionState from "@/store/options";
import { isAfter, isSameDay, isSameOrBefore } from "@/utils/date";
import { getOptionIdofPath } from "@/utils/path";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import tw from "tailwind-styled-components";
import AddEventModal from "../addEventModal";
import DayCell from "../dayCell";

interface Event {
  title: string;
  body: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  check: boolean;
}

const Container = tw.div`
  w-full h-[calc(100%-7rem)]
  grid grid-cols-7 grid-auto-row
`;

export default function DayContainer() {
  const now = useMemo(() => new Date(), []);
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

  const { isOpen, openModal, closeModal } = useModalOpen();
  const [clickedDay, setClickedDay] = useState<Date>();

  const [events, setEvents] = useState<any>();

  const path = usePathname();
  const { options } = useOptionState();

  const supabase = createClient();

  useEffect(() => {
    const optionId = getOptionIdofPath(path, options);

    if (!optionId) {
      console.error("주소가 유효하지 않습니다.");
      return;
    }

    const getEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select()
        .eq("option_id", optionId);

      if (error) {
        console.log("조회오류", error);
      } else {
        console.log("성공", data);
        setEvents(data);
      }
    };

    getEvents();
  }, [path]);

  return (
    <Container>
      {days.map((day, index) => (
        <DayCell
          key={index}
          day={day}
          setClickedDay={setClickedDay}
          onOpen={openModal}
          className={`${day !== null ? "shadow-sm cursor-pointer" : ""} ${
            day?.getDay() === 0 ? "text-lightred" : ""
          }`}
        >
          <span
            className={`flex justify-center items-center rounded-full w-[2rem] h-[2rem] ${
              toDayCheck && now.getDate() === day?.getDate()
                ? "bg-lightred text-white"
                : ""
            }`}
          >
            {day ? day.getDate() : ""}
          </span>
          <span className="absolute top-[3.2rem] w-full left-0 flex flex-col">
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
                    className="w-full bg-lightgray h-max text-r flex justify-center"
                  >
                    {event.title}
                  </span>
                ))}
          </span>
        </DayCell>
      ))}
      {isOpen && clickedDay && (
        <AddEventModal day={clickedDay} onClose={closeModal} />
      )}
    </Container>
  );
}
