import { getDaysInMonth } from "@/utils/date";
import { create } from "zustand";

interface CalendarState {
  now: Date;
  days: (Date | null)[];
  setDays: () => void;
  goToLeftMonth: () => void;
  goToRightMonth: () => void;
}

// 캘린더에 나타나는 날짜 배열
const useCalendarState = create<CalendarState>((set) => ({
  now: new Date(),
  days: [],
  setDays: () =>
    set((state) => {
      const days = getDaysInMonth(
        state.now.getFullYear(),
        state.now.getMonth()
      );
      return { days };
    }),
  goToLeftMonth: () =>
    set((state) => {
      const prevMonth = new Date(
        state.now.getFullYear(),
        state.now.getMonth() - 1,
        1
      );
      const days = getDaysInMonth(
        prevMonth.getFullYear(),
        prevMonth.getMonth()
      );
      return { now: prevMonth, days };
    }),
  goToRightMonth: () =>
    set((state) => {
      const nextMonth = new Date(
        state.now.getFullYear(),
        state.now.getMonth() + 1,
        1
      );
      const days = getDaysInMonth(
        nextMonth.getFullYear(),
        nextMonth.getMonth()
      );
      return { now: nextMonth, days };
    }),
}));

export default useCalendarState;
