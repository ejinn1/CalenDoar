import { create } from "zustand";

export interface Time {
  hour: number;
  minute: number;
}

interface EventSchedulerState {
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
  startTime: Time;
  setStartTime: (time: Partial<Time>) => void;
  endTime: Time;
  setEndTime: (time: Partial<Time>) => void;
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
  setStartTime: (newTime) =>
    set((state) => ({
      startTime: { ...state.startTime, ...newTime },
    })),
  endTime: {
    hour: 24,
    minute: 0,
  },
  setEndTime: (newTime) =>
    set((state) => ({
      endTime: { ...state.endTime, ...newTime },
    })),
}));

export default useEventScheduler;
