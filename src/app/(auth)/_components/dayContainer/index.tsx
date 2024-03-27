import useModalOpen from "@/hooks/useModalOpen";
import { createClient } from "@/libs/supabase/client";
import useCalendarState from "@/store/calendarDay";
import useOptionState from "@/store/options";
import { getOptionIdOfPath } from "@/utils/path";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import tw from "tailwind-styled-components";
import AddEventModal from "../addEventModal";
import WeekRow from "../weekRow";

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
  overflow-scroll
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

  const [events, setEvents] = useState<Event[]>();

  const path = usePathname();
  const { options } = useOptionState();

  const supabase = createClient();

  useEffect(() => {
    const optionId = getOptionIdOfPath(path, options);

    if (!optionId) {
      console.error("주소가 유효하지 않습니다.");
      return;
    }

    const getEvents = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("events")
        .select()
        .eq("option_id", optionId)
        .eq("user_id", user.id);

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
      <WeekRow
        days={days.slice(0, 7)}
        events={events}
        setClickedDay={() => setClickedDay}
        onOpen={openModal}
        toDayCheck={toDayCheck}
      />
      <WeekRow
        days={days.slice(7, 14)}
        events={events}
        setClickedDay={() => setClickedDay}
        onOpen={openModal}
        toDayCheck={toDayCheck}
      />
      <WeekRow
        days={days.slice(14, 21)}
        events={events}
        setClickedDay={() => setClickedDay}
        onOpen={openModal}
        toDayCheck={toDayCheck}
      />
      <WeekRow
        days={days.slice(21, 28)}
        events={events}
        setClickedDay={() => setClickedDay}
        onOpen={openModal}
        toDayCheck={toDayCheck}
      />
      <WeekRow
        days={days.slice(28, 35)}
        events={events}
        setClickedDay={() => setClickedDay}
        onOpen={openModal}
        toDayCheck={toDayCheck}
      />
      <WeekRow
        days={days.slice(35, 42)}
        events={events}
        setClickedDay={() => setClickedDay}
        onOpen={openModal}
        toDayCheck={toDayCheck}
      />
      {isOpen && clickedDay && (
        <AddEventModal day={clickedDay} onClose={closeModal} />
      )}
    </Container>
  );
}
