import { createClient } from "@/libs/supabase/server";

interface Prop {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Prop) {
  const supabase = createClient();

  const getSessionOfUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;
  };

  getSessionOfUser();

  return children;
}
