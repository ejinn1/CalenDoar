"use client";

import { createClient } from "@/libs/supabase/client";
import useEventScheduler from "@/store/eventScheduler";
import useOptionState from "@/store/options";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import tw from "tailwind-styled-components";
import Container from "../_components/Container";
import TimeSelect from "../_components/TimeSelect";
import ChoseDateBox from "../_components/choseDateBox";

interface Timeconfig {
  startHour: boolean;
  startMinute: boolean;
  EndHour: boolean;
  EndMinute: boolean;
}

interface Prop {
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

export default function AddEventModal({ day, onClose }: Prop) {
  const supabase = createClient();

  const { selectedOption, options, allOption, toggleUpdate } = useOptionState();
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
  } = useEventScheduler();

  const [isTimeConfig, setIsTimeConfig] = useState(false);
  const [pickedOption, setPickedOption] = useState(selectedOption.id);
  const [isClickedDate, setIsClickedDate] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [timeConfig, setTimeConfig] = useState<Partial<Timeconfig>>({
    startHour: false,
    startMinute: false,
    EndHour: false,
    EndMinute: false,
  });

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

    const newEvent = {
      title: title,
      body: body,
      start_date: start_date,
      end_date: end_date,
      start_time: start_time,
      end_time: end_time,
      option_id: pickedOption,
      user_id: user.id,
    };

    const { error } = await supabase.from("events").insert(newEvent);

    if (error) {
      console.log(error);
    } else {
      toggleUpdate();
      onClose();
    }
  };

  useEffect(() => {
    setStartDate(day);
    setEndDate(day);
  }, [day]);

  return (
    <Container>
      <header className="flex flex-col gap-[1rem] pb-[1rem]">
        <h1 className="text-l font-bold">일정 등록</h1>
        <div className="relative bg-white dark:bg-gray text-black w-max">
          <div className="flex items-center justify-center p-2">
            <div className="overflow-auto">
              <select
                value={pickedOption}
                onChange={(e) => setPickedOption(e.target.value)}
                className="text-m text-gray dark:text-white font-bold bg-transparent cursor-pointer outline-none"
              >
                <option key={allOption.id} value={allOption.id}>
                  {allOption.name}
                </option>
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
                      <Button
                        onClick={() => setTimeConfig({ startHour: true })}
                        className="relative"
                      >
                        {startTime.hour.toString().padStart(2, "0")}
                        {timeConfig.startHour && (
                          <TimeSelect
                            type="hour"
                            onSelect={(hour) => setStartTime({ hour })}
                            onClose={() => setTimeConfig({ startHour: false })}
                          />
                        )}
                      </Button>
                      <span>:</span>
                      <Button
                        onClick={() => setTimeConfig({ startMinute: true })}
                        className="relative"
                      >
                        {startTime.minute.toString().padStart(2, "0")}
                        {timeConfig.startMinute && (
                          <TimeSelect
                            type="minute"
                            onSelect={(minute) => setStartTime({ minute })}
                            onClose={() =>
                              setTimeConfig({ startMinute: false })
                            }
                          />
                        )}
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
                        <span>
                          <Button
                            onClick={() => setTimeConfig({ EndHour: true })}
                            className="relative"
                          >
                            {endTime.hour.toString().padStart(2, "0")}
                            {timeConfig.EndHour && (
                              <TimeSelect
                                type="hour"
                                onSelect={(hour) => setEndTime({ hour })}
                                onClose={() =>
                                  setTimeConfig({ EndHour: false })
                                }
                              />
                            )}
                          </Button>
                          <span>:</span>
                          <Button
                            onClick={() => setTimeConfig({ EndMinute: true })}
                            className="relative"
                          >
                            {endTime.minute.toString().padStart(2, "0")}
                            {timeConfig.EndMinute && (
                              <TimeSelect
                                type="minute"
                                onSelect={(minute) => setEndTime({ minute })}
                                onClose={() =>
                                  setTimeConfig({ EndMinute: false })
                                }
                              />
                            )}
                          </Button>
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
              <Button
                onClick={() => {
                  setIsTimeConfig((prev) => !prev);
                  setStartTime({ hour: 0, minute: 0 });
                  setEndTime({ hour: 24, minute: 0 });
                }}
                className={`${isTimeConfig && "bg-lightgray dark:bg-darkgray"}`}
              >
                시간설정
              </Button>
            </div>
          </Field>
          <Field>
            <Label>제목</Label>
            <Input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
            />
            {!title && (
              <span className="absolute -bottom-[2rem] left-0 text-lightred dark:text-lightyellow flex items-center gap-[0.3rem]">
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
            onClick={onClose}
            className="px-[1.4rem] py-[0.8rem] border-[0.1rem] rounded-lg border-lightgray text-m font-semibold"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!title.trim()}
            className={`px-[1.4rem] py-[0.8rem] rounded-lg text-white text-m font-semibold
              ${!title.trim() ? "bg-lightgray" : "bg-lightblue"}
              transition-bg duration-200 ease-in-out
            `}
          >
            저장
          </button>
        </div>
      </Form>
    </Container>
  );
}
