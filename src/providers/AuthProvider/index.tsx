"use client";

import { createClient } from "@/libs/supabase/client";
import useUserInfoStore from "@/store/user/info";
import { useEffect } from "react";

interface Prop {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Prop) {
  const supabase = createClient();
  const { setUser } = useUserInfoStore();

  useEffect(() => {
    const getUsers = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
      }
    };
    getUsers();
  }, []);

  return children;
}
