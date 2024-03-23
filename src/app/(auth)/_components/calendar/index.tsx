"use client";

import { createClient } from "@/libs/supabase/client";
import useCalendarState from "@/store/calendarDay";
import useOptionState from "@/store/options";
import { getOptionIdofPath } from "@/utils/path";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import tw from "tailwind-styled-components";
import ContentsBox from "../contentsBox";

interface Prop {
  children: React.ReactNode;
}

const WeekContainer = tw.div`
  grid grid-cols-7
`;

const WeekCell = tw.div`
  w-full h-[3rem] text-[1.5rem] pl-[1.2rem]
  flex justify-start items-center font-semibold
`;

const ArrowContainer = tw.div`
  flex justify-center items-center opacity-30 cursor-pointer
  hover:opacity-100 transition-opacity duration-300 ease-in-out
`;

const TodayContainer = tw.div`
  w-[4rem] ml-2 flex justify-center items-center
  border-2 rounded-lg p-2 border-lightgray border-dotted
  cursor-pointer
  hover:bg-lightgray transition-bg duration-300 ease-in-out
`;

export default function Calendar({ children }: Prop) {
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const { viewDate, goToLeftMonth, goToRightMonth, goToTodayMonth } =
    useCalendarState();

  const path = usePathname();
  const { options } = useOptionState();

  const supabase = createClient();

  useEffect(() => {
    const optionId = getOptionIdofPath(path, options);

    if (!optionId) {
      console.error("주소가 유효하지 않습니다.");
      return;
    }

    const getEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select()
        .eq("option_id", optionId);

      if (error) {
        console.log("조회오류", error);
      } else {
        console.log("성공", data);
      }
    };

    getEvents();
  }, [path]);

  return (
    <ContentsBox>
      <header className="relative flex w-[20rem] items-center justify-between gap-[2rem]">
        <div className="h-[4rem] text-l font-bold flex items-center justify-center">{`${viewDate.getFullYear()}.${(
          viewDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}`}</div>

        <div className="flex">
          <ArrowContainer onClick={goToLeftMonth}>
            <Image
              src="/leftArrow.png"
              alt="왼쪽 화살표"
              width={16}
              height={16}
            />
          </ArrowContainer>
          <ArrowContainer onClick={goToRightMonth}>
            <Image
              src="/rightArrow.png"
              alt="왼쪽 화살표"
              width={16}
              height={16}
            />
          </ArrowContainer>
          <TodayContainer onClick={goToTodayMonth}>오늘</TodayContainer>
        </div>
      </header>
      <WeekContainer>
        {weekdays.map((week, index) => (
          <WeekCell key={index} className={index === 0 ? "text-lightred" : ""}>
            {week}
          </WeekCell>
        ))}
      </WeekContainer>
      {children}
    </ContentsBox>
  );
}
