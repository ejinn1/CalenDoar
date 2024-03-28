import { create } from "zustand";

export interface Event {
  title: string;
  body?: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  check?: boolean;
}

interface EventState {
  events: Event[];
  setEvents: (events: Event[]) => void;
}

const useEventState = create<EventState>((set) => ({
  events: [],
  setEvents: (events: Event[]) => set({ events }),
}));

export default useEventState;
