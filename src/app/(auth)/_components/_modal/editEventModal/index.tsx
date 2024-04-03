"use client";

import useModalOpen from "@/hooks/useModalOpen";
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
  text-m font-medium bg-lightgray dark:bg-darkgray rounded-lg p-[1rem] outline-none
`;

const TextArea = tw.textarea`
  text-m font-medium bg-lightgray dark:bg-darkgray rounded-lg p-[1rem] outline-none
`;

const Form = tw.form`
  flex flex-col justify-between gap-[2rem] h-[calc(100%-9rem)] pt-[1rem] border-t-2 border-lightgray
`;

const Button = tw.span`
  hover:bg-lightgray dark:hover:bg-darkgray p-2 rounded-lg text-m font-semibold cursor-pointer
  transition-bg duration-300 ease-in-out
`;

export default function EditEventModal({ event, day, onClose }: Prop) {
  const supabase = createClient();

  const { options, toggleUpdate } = useOptionState();
  const { startDate, setStartDate, endDate, setEndDate, startTime, endTime } =
    useEventScheduler();
  const {
    isOpen: isOpenDel,
    openModal: openDel,
    closeModal: closeDel,
  } = useModalOpen();

  const [isTimeConfig, setIsTimeConfig] = useState(false);
  const [seletedOption, setSelectedOption] = useState(event.option_id);
  const [isClickedDate, setIsClickedDate] = useState(false);
  const [title, setTitle] = useState(event.title);
  const [body, setBody] = useState(event.body);
  const [isEdit, setIsEdit] = useState(false);

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

  const handleDelete = async () => {
    const { error } = await supabase.from("events").delete().eq("id", event.id);

    if (error) {
      console.log(error);
    } else {
      toggleUpdate();
      onClose();
    }
  };

  useEffect(() => {
    setStartDate(new Date(event.start_date));
    setEndDate(new Date(event.end_date));
  }, [event]);

  useEffect(() => {
    if (event.title !== title || event.body !== body) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [title, body]);

  return (
    <Container>
      <header className="flex flex-col gap-[1rem] pb-[1rem]">
        <h1 className="text-l font-bold">{event.title}</h1>
        <div className="relative bg-white dark:bg-gray  text-black w-max">
          <div className="flex items-center justify-center p-2">
            <div className="overflow-auto">
              <select
                value={seletedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="text-m text-gray dark:text-white font-bold bg-transparent cursor-pointer outline-none"
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
                  <Button onClick={() => setIsClickedDate((prev) => !prev)}>{`${
                    startDate.getMonth() + 1
                  }월 ${startDate.getDate()}일 ${
                    weekdays[startDate.getDay()]
                  }`}</Button>
                  {isTimeConfig && (
                    <span>
                      <Button>
                        {`${startTime.hour
                          .toString()
                          .padStart(2, "0")} : ${startTime.minute
                          .toString()
                          .padStart(2, "0")}`}
                      </Button>
                    </span>
                  )}
                </div>
                {startDate.getDate() !== endDate.getDate() && (
                  <>
                    <div className="text-l font-medium">~</div>
                    <div>
                      <Button
                        onClick={() => setIsClickedDate((prev) => !prev)}
                      >{`${endDate.getMonth() + 1}월 ${endDate.getDate()}일 ${
                        weekdays[endDate.getDay()]
                      }`}</Button>
                      {isTimeConfig && (
                        <Button>
                          <span>{`${endTime.hour
                            .toString()
                            .padStart(2, "0")} : ${endTime.minute
                            .toString()
                            .padStart(2, "0")}`}</span>
                        </Button>
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
              <Button
                onClick={() => setIsTimeConfig((prev) => !prev)}
                className={` ${
                  isTimeConfig && "bg-lightgray dark:bg-darkgray"
                }`}
              >
                시간설정
              </Button>
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
            type="button"
            onClick={openDel}
            className="px-[1.4rem] py-[0.8rem] rounded-lg bg-lightred text-white text-m font-semibold"
          >
            삭제
          </button>
          {isEdit && (
            <button
              type="submit"
              className="px-[1.4rem] py-[0.8rem] rounded-lg bg-lightblue text-white text-m font-semibold"
            >
              수정
            </button>
          )}
        </div>
      </Form>
      {isOpenDel && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center z-10 drop-shadow-md">
          <div className="relative flex flex-col justify-center gap-[2rem] w-[30rem] h-[14rem] shadow-md rounded-lg bg-white dark:bg-darkgray">
            <div className="text-l font-bold flex justify-center items-center">
              삭제 할꺼?
            </div>
            <div className="flex justify-center gap-[2rem] w-full">
              <button
                onClick={closeDel}
                className="px-[1.4rem] py-[0.8rem] rounded-lg bg-lightgray dark:bg-gray text-white text-m font-semibold"
              >
                아니
              </button>
              <button
                onClick={handleDelete}
                className="px-[1.4rem] py-[0.8rem] rounded-lg bg-lightred text-white text-m font-semibold"
              >
                응
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
