import useModalOpen from "@/hooks/useModalOpen";
import { createClient } from "@/libs/supabase/client";
import useCalendarState from "@/store/calendarDay";
import useEventState from "@/store/events";
import useOptionState from "@/store/options";
import { getOptionIdOfPath } from "@/utils/path";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import tw from "tailwind-styled-components";
import AddEventModal from "../addEventModal";
import WeekRow from "../weekRow";

const Container = tw.div`
  w-full h-[calc(100%-7rem)]
  overflow-scroll
`;

export default function DayContainer() {
  const supabase = createClient();
  const path = usePathname();

  const now = useMemo(() => new Date(), []);

  const {
    viewDate,
    days,
    setDays,
    goToLeftMonth,
    goToRightMonth,
    goToTodayMonth,
  } = useCalendarState();
  const { isOpen, openModal, closeModal } = useModalOpen();
  const { events, setEvents } = useEventState();
  const { options, isUpdate } = useOptionState();

  const [toDayCheck, setToDayCheck] = useState(true);
  const [clickedDay, setClickedDay] = useState<Date>();

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

      let query = supabase.from("events").select().eq("user_id", user.id);

      if (path !== "/") {
        query = query.eq("option_id", optionId);
      }

      const { data, error } = await query;

      if (error) {
        console.log("조회오류", error);
      } else {
        setEvents(data);
      }
    };

    getEvents();
  }, [path, isUpdate]);

  return (
    <Container>
      <WeekRow
        days={days.slice(0, 7)}
        events={events}
        setClickedDay={setClickedDay}
        onOpen={openModal}
        toDayCheck={toDayCheck}
      />
      <WeekRow
        days={days.slice(7, 14)}
        events={events}
        setClickedDay={setClickedDay}
        onOpen={openModal}
        toDayCheck={toDayCheck}
      />
      <WeekRow
        days={days.slice(14, 21)}
        events={events}
        setClickedDay={setClickedDay}
        onOpen={openModal}
        toDayCheck={toDayCheck}
      />
      <WeekRow
        days={days.slice(21, 28)}
        events={events}
        setClickedDay={setClickedDay}
        onOpen={openModal}
        toDayCheck={toDayCheck}
      />
      <WeekRow
        days={days.slice(28, 35)}
        events={events}
        setClickedDay={setClickedDay}
        onOpen={openModal}
        toDayCheck={toDayCheck}
      />
      <WeekRow
        days={days.slice(35, 42)}
        events={events}
        setClickedDay={setClickedDay}
        onOpen={openModal}
        toDayCheck={toDayCheck}
      />
      {isOpen && clickedDay && (
        <AddEventModal day={clickedDay} onClose={closeModal} />
      )}
    </Container>
  );
}
