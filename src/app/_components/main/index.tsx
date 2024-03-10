"use client";

import DayContainer from "@/app/(auth)/_components/dayContainer";
import tw from "tailwind-styled-components";
import Calendar from "../../(auth)/_components/calendar";

const StyledMain = tw.main`
    w-full h-full
    flex
`;

export default function Main() {
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
