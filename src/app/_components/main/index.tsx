"use client";

import DayContainer from "@/app/(auth)/_components/dayContainer";
import { createClient } from "@/libs/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import tw from "tailwind-styled-components";
import Calendar from "../../(auth)/_components/calendar";

const StyledMain = tw.main`
    w-full h-full
    flex
`;

export default function Main() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
      }
    };
    getSession();
  }, [router]);

  return (
    <StyledMain>
      <section className="w-full h-full">
        <Calendar>
          <DayContainer />
        </Calendar>
      </section>
    </StyledMain>
  );
}
