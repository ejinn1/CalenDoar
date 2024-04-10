"use client";

import { createClient } from "@/libs/supabase/client";
import { Event } from "@/store/events";
import useOptionState, { Option } from "@/store/options";
import { isAfter, isSameDay, isSameOrBefore } from "@/utils/date";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ContentsBox from "../../_components/contentsBox";

export default function DetailDay() {
  const supabase = createClient();
  const param = useParams<{ detailDate: string }>();

  const { options } = useOptionState();

  const [day, setDay] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>();
  const [viewEvents, setViewEvents] = useState<Event[]>();
  const [viewOptions, setViewOptions] = useState<Option[]>();

  useEffect(() => {
    setDay(new Date(param.detailDate));

    const getEvents = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("events")
        .select()
        .eq("user_id", user.id);

      if (error) {
        console.log("이벤트 조회 오류", error);
      } else {
        setEvents(data as Event[]);
      }
    };

    getEvents();
  }, [param]);

  useEffect(() => {
    if (!events) return;
    setViewEvents(
      events.filter((event) => {
        const start = new Date(event.start_date);
        const end = new Date(event.end_date);

        return (
          isSameDay(start, day) ||
          (isAfter(day, start) && isSameOrBefore(day, end))
        );
      })
    );
  }, [events]);

  useEffect(() => {
    const optionIds = viewEvents && viewEvents.map((event) => event.option_id);

    const view = options.filter((option) => optionIds?.includes(option.id));

    setViewOptions(view);
  }, [viewEvents]);

  return (
    <ContentsBox>
      <div className="w-full text-l font-bold">{`${day.getFullYear()}-${
        day.getMonth() + 1
      }-${day.getDate()}`}</div>
      <div className="flex w-full h-[calc(100%-2rem)] gap-[1rem] pt-[1rem]">
        <div className="w-full h-full flex flex-col gap-[1rem]">
          {viewOptions &&
            viewOptions.map((option, index) => (
              <span key={index}>{option.name}</span>
            ))}
          {viewEvents &&
            viewEvents.map((event, index) => (
              <span key={index} className="w-full">
                {event.title}
              </span>
            ))}
        </div>
        <div className="w-full h-full border-[0.1rem] border-lightgray rounded-lg flex flex-col overflow-y-auto p-[1rem]">
          {Array.from({ length: 25 }).map((time, index) => (
            <div key={index} className="h-full border-b-[0.1rem]">
              <span>{index}</span>
            </div>
          ))}
        </div>
      </div>
    </ContentsBox>
  );
}
