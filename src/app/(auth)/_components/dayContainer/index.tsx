import Loading from "@/app/_components/loading";
import useModalOpen from "@/hooks/useModalOpen";
import { createClient } from "@/libs/supabase/client";
import useCalendarState from "@/store/calendarDay";
import useEventState from "@/store/events";
import useOptionState from "@/store/options";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import AddEventModal from "../_modal/addEventModal";
import WeekRow from "../weekRow";

const Container = tw.div`
  w-full h-[calc(100%-7rem)]
  overflow-scroll
`;

export default function DayContainer() {
  const supabase = createClient();

  const {
    viewDate,
    days,
    setDays,
    goToLeftMonth,
    goToRightMonth,
    goToTodayMonth,
  } = useCalendarState();
  const {
    isOpen: isOpenAdd,
    openModal: openAddModal,
    closeModal: closeAddMoal,
  } = useModalOpen();

  const { events, setEvents } = useEventState();
  const { selectedOption, isUpdate } = useOptionState();

  const [selectedDay, setSelectedDay] = useState<Date>();
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const [viewEvents, setViewEvents] = useState(events);
  const [isLoading, setIsLoading] = useState(true);

  // 타이머를 활용한 스크롤 이벤트
  const handleWheelEvent = (e: React.WheelEvent) => {
    console.log("scroll");

    if (debounceTimer) clearTimeout(debounceTimer);
    const newTimer = setTimeout(() => {
      if (e.deltaY > 10) {
        goToRightMonth();
      } else if (e.deltaY < -10) {
        goToLeftMonth();
      }
    }, 100);
    setDebounceTimer(newTimer);
  };

  useEffect(() => {
    setDays(viewDate.getFullYear(), viewDate.getMonth());
  }, [viewDate, setDays, goToLeftMonth, goToRightMonth, goToTodayMonth]);

  useEffect(() => {
    const getEvents = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("events")
        .select()
        .eq("user_id", user.id);

      if (error) {
        console.log("조회오류", error);
      } else {
        setEvents(data);
      }
    };

    getEvents();
  }, [isUpdate]);

  useEffect(() => {
    if (selectedOption.id === "a7a9a629-fc06-4fc3-99bd-7ba881e4fb0f") {
      setViewEvents(events);
      setIsLoading(false);
    } else {
      setViewEvents(
        events.filter((event) => event.option_id === selectedOption.id)
      );
      setIsLoading(false);
    }
  }, [selectedOption, events]);

  useEffect(() => {
    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [debounceTimer]);

  return (
    <Container onWheel={handleWheelEvent}>
      {isLoading && <Loading size={40} />}
      <WeekRow
        days={days.slice(0, 7)}
        events={viewEvents}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        openAdd={openAddModal}
      />
      <WeekRow
        days={days.slice(7, 14)}
        events={viewEvents}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        openAdd={openAddModal}
      />
      <WeekRow
        days={days.slice(14, 21)}
        events={viewEvents}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        openAdd={openAddModal}
      />
      <WeekRow
        days={days.slice(21, 28)}
        events={viewEvents}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        openAdd={openAddModal}
      />
      <WeekRow
        days={days.slice(28, 35)}
        events={viewEvents}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        openAdd={openAddModal}
      />
      {days.slice(35, 42).length !== 0 && (
        <WeekRow
          days={days.slice(35, 42)}
          events={viewEvents}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          openAdd={openAddModal}
        />
      )}
      {isOpenAdd && selectedDay && (
        <AddEventModal day={selectedDay} onClose={closeAddMoal} />
      )}
    </Container>
  );
}
