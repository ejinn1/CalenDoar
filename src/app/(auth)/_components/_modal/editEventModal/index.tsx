"use client";

import { createClient } from "@/libs/supabase/client";
import useEventScheduler from "@/store/eventScheduler";
import { Event } from "@/store/events";
import useOptionState from "@/store/options";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import tw from "tailwind-styled-components";
import ChoseDateBox from "../../choseDateBox";
import Container from "../_components/Container";

interface Prop {
  event: Event;
  day: Date;
  onClose: () => void;
}

const Field = tw.div`
  flex flex-col gap-[1rem] relative
`;

const Label = tw.label`
  text-m font-semibold
`;

const Input = tw.input`
  text-m font-medium bg-lightgray rounded-lg p-[1rem] outline-none
`;

const TextArea = tw.textarea`
  text-m font-medium bg-lightgray rounded-lg p-[1rem] outline-none
`;

const Form = tw.form`
  flex flex-col justify-between gap-[2rem] h-[calc(100%-9rem)] pt-[1rem] border-t-2 border-lightgray
`;

export default function EditEventModal({ event, day, onClose }: Prop) {
  const supabase = createClient();

  const { options, toggleUpdate } = useOptionState();
  const { startDate, setStartDate, endDate, setEndDate, startTime, endTime } =
    useEventScheduler();

  const [isTimeConfig, setIsTimeConfig] = useState(false);
  const [seletedOption, setSelectedOption] = useState(event.option_id);
  const [isClickedDate, setIsClickedDate] = useState(false);
  const [title, setTitle] = useState(event.title);
  const [body, setBody] = useState(event.body);

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const start_date = `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${startDate.getDate().toString().padStart(2, "0")}`;
    const end_date = `${endDate.getFullYear()}-${(endDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${endDate.getDate().toString().padStart(2, "0")}`;

    const start_time = `${startTime.hour
      .toString()
      .padStart(2, "0")}:${startTime.minute.toString().padStart(2, "0")}`;
    const end_time = `${endTime.hour
      .toString()
      .padStart(2, "0")}:${endTime.minute.toString().padStart(2, "0")}`;

    const editEvent = {
      title: title,
      body: body,
      start_date: start_date,
      end_date: end_date,
      start_time: start_time,
      end_time: end_time,
    };

    const { error } = await supabase
      .from("events")
      .update(editEvent)
      .eq("id", event.id);

    if (error) {
      console.log(error);
    } else {
      toggleUpdate();
      onClose();
    }
  };

  useEffect(() => {
    console.log(event);

    setStartDate(new Date(event.start_date));
    setEndDate(new Date(event.end_date));
  }, [event]);

  return (
    <Container>
      <header className="flex flex-col gap-[1rem] pb-[1rem]">
        <h1 className="text-l font-bold">일정 수정</h1>
        <div className="relative bg-white text-black w-max">
          <div className="flex items-center justify-center p-2">
            <div className="overflow-auto">
              <select
                value={seletedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="text-m text-gray font-bold bg-transparent cursor-pointer outline-none"
              >
                {options.map((option, index) => (
                  <option key={index} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>
      <IoClose
        onClick={onClose}
        size={20}
        className="absolute top-[2rem] right-[2rem] cursor-pointer opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-100"
      />
      <Form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-[3rem]">
          <Field>
            <div className="flex justify-between">
              <div className="relative text-m font-semibold flex gap-2 items-center">
                <div>
                  <span
                    onClick={() => setIsClickedDate((prev) => !prev)}
                    className="hover:bg-lightgray p-2 rounded-lg cursor-pointer"
                  >{`${startDate.getMonth() + 1}월 ${startDate.getDate()}일 ${
                    weekdays[startDate.getDay()]
                  }`}</span>
                  {isTimeConfig && (
                    <span>
                      <span className="hover:bg-lightgray p-2 rounded-lg cursor-pointer">
                        {`${startTime.hour
                          .toString()
                          .padStart(2, "0")} : ${startTime.minute
                          .toString()
                          .padStart(2, "0")}`}
                      </span>
                    </span>
                  )}
                </div>
                {startDate.getDate() !== endDate.getDate() && (
                  <>
                    <div className="text-l font-medium">~</div>
                    <div>
                      <span
                        onClick={() => setIsClickedDate((prev) => !prev)}
                        className="hover:bg-lightgray p-2 rounded-lg cursor-pointer"
                      >{`${endDate.getMonth() + 1}월 ${endDate.getDate()}일 ${
                        weekdays[endDate.getDay()]
                      }`}</span>
                      {isTimeConfig && (
                        <span className="hover:bg-lightgray p-2 rounded-lg cursor-pointer">
                          <span>{`${endTime.hour
                            .toString()
                            .padStart(2, "0")} : ${endTime.minute
                            .toString()
                            .padStart(2, "0")}`}</span>
                        </span>
                      )}
                    </div>
                  </>
                )}
                {isClickedDate && (
                  <ChoseDateBox
                    clickedDate={day}
                    startDate={startDate}
                    endDate={endDate}
                    onClose={() => setIsClickedDate((prev) => !prev)}
                  />
                )}
              </div>
              <div
                onClick={() => setIsTimeConfig((prev) => !prev)}
                className={`text-m font-semibold text-gray hover:bg-lightgray transition-bg duration-300 ease-in-out flex items-center p-2 rounded-lg cursor-pointer ${
                  isTimeConfig && "bg-lightgray"
                }`}
              >
                시간설정
              </div>
            </div>
          </Field>
          <Field>
            <Label>제목</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
            />
            {!title && (
              <span className="absolute -bottom-[2rem] left-0 text-lightred flex items-center gap-[0.3rem]">
                추가할 일정의 제목을 입력해주세요
              </span>
            )}
          </Field>
          <Field>
            <Label>내용</Label>
            <TextArea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="내용을 입력해주세요"
            />
          </Field>
        </div>
        <div className="flex justify-end gap-[1rem]">
          <button
            type="submit"
            className="px-[1.4rem] py-[0.8rem] border-[0.1rem] rounded-lg bg-lightblue text-white text-m font-semibold"
          >
            수정
          </button>
        </div>
      </Form>
    </Container>
  );
}
