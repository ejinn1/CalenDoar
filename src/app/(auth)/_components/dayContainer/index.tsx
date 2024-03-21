import useModalOpen from "@/hooks/useModalOpen";
import useCalendarState from "@/store/calendarDay";
import { useEffect, useMemo, useState } from "react";
import tw from "tailwind-styled-components";
import AddEventModal from "../addEventModal";
import DayCell from "../dayCell";

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
        </DayCell>
      ))}
      {isOpen && clickedDay && (
        <AddEventModal day={clickedDay} onClose={closeModal} />
      )}
    </Container>
  );
}
