import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface UserInfo {
  user: User | null;
  setUser: (user: User) => void;
}

const useUserInfoStore = create<UserInfo>((set) => ({
  user: null,
  setUser: (user: User) =>
    set(() => ({
      user,
    })),
}));

export default useUserInfoStore;
