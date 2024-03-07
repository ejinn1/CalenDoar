import { getDaysInMonth } from "@/utils/date";
import { create } from "zustand";

interface CalendarState {
  viewDate: Date;
  days: (Date | null)[];
  setDays: (year: number, month: number) => void;
  goToLeftMonth: () => void;
  goToRightMonth: () => void;
}

// 캘린더에 나타나는 날짜 배열
const useCalendarState = create<CalendarState>((set) => ({
  viewDate: new Date(),
  days: [],
  setDays: (year, month) =>
    set(() => {
      const days = getDaysInMonth(year, month);
      return { days };
    }),
  goToLeftMonth: () =>
    set((state) => {
      const prevMonth = new Date(
        state.viewDate.getFullYear(),
        state.viewDate.getMonth() - 1,
        1
      );
      const days = getDaysInMonth(
        prevMonth.getFullYear(),
        prevMonth.getMonth()
      );
      return { viewDate: prevMonth, days };
    }),
  goToRightMonth: () =>
    set((state) => {
      const nextMonth = new Date(
        state.viewDate.getFullYear(),
        state.viewDate.getMonth() + 1,
        1
      );
      const days = getDaysInMonth(
        nextMonth.getFullYear(),
        nextMonth.getMonth()
      );
      return { viewDate: nextMonth, days };
    }),
}));

export default useCalendarState;
