import { create } from "zustand";

interface Time {
  hour: number;
  minute: number;
}

interface EventSchedulerState {
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
  startTime: Time;
  setStartTime: (time: Time) => void;
  endTime: Time;
  setEndTime: (time: Time) => void;
}

const useEventScheduler = create<EventSchedulerState>((set) => ({
  startDate: new Date(),
  setStartDate: (startDate: Date) => set(() => ({ startDate })),
  endDate: new Date(),
  setEndDate: (endDate: Date) => set(() => ({ endDate })),

  startTime: {
    hour: 0,
    minute: 0,
  },
  setStartTime: (startTime: Time) => set(() => ({ startTime })),
  endTime: {
    hour: 24,
    minute: 0,
  },
  setEndTime: (endTime: Time) => set(() => ({ endTime })),
}));

export default useEventScheduler;
