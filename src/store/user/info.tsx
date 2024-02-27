import { create } from "zustand";

interface User {
  username: string;
  password: string;
}

interface InfoState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserInfo = create<InfoState>((set) => ({
  user: null,
  setUser(user: User) {
    set({ user });
  },
  clearUser() {
    set({ user: null });
  },
}));

export default useUserInfo;
