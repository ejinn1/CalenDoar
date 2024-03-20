"use client";

import useOptionState from "@/store/options";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import tw from "tailwind-styled-components";

interface Prop {
  day: Date;
  onClose: () => void;
}

const Field = tw.div`
  flex flex-col gap-[1rem]
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
  flex flex-col justify-between gap-[2rem] h-[calc(100%-9rem)] pt-[2rem] border-t-2 border-lightgray
`;

export default function AddEventModal({ day, onClose }: Prop) {
  const handleSubmit = () => {};
  const [isTimeConfig, setIsTimeConfig] = useState(false);

  const [seletedOption, setSelectedOption] = useState("");
  const { options } = useOptionState();

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center z-10 drop-shadow-md">
      <div className="relative bg-white p-[2rem] rounded-lg w-[50rem] h-[50rem] shadow-md">
        <header className="flex flex-col gap-[1rem] pb-[1rem]">
          <h1 className="text-l font-bold">이벤트 등록</h1>
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
          size={28}
          className="absolute top-[2rem] right-[2rem] cursor-pointer opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-100"
        />
        <Form onSubmit={handleSubmit} className="">
          <div className="flex flex-col gap-[2rem]">
            <Field>
              <div className="flex justify-between">
                <div className="text-m font-semibold flex gap-2 items-center">
                  <div>
                    <span className="hover:bg-lightgray p-2 rounded-lg cursor-pointer">{`${
                      day.getMonth() + 1
                    }월 ${day.getDate()}일`}</span>

                    {isTimeConfig && (
                      <span>
                        <span className="hover:bg-lightgray p-2 rounded-lg cursor-pointer">
                          00:00
                        </span>
                      </span>
                    )}
                  </div>
                  <div className="text-l font-medium">~</div>
                  <div>
                    <span className="hover:bg-lightgray p-2 rounded-lg cursor-pointer">{`${
                      day.getMonth() + 1
                    }월 ${day.getDate()}일`}</span>
                    {isTimeConfig && (
                      <span className="hover:bg-lightgray p-2 rounded-lg cursor-pointer">
                        <span>24:00</span>
                      </span>
                    )}
                  </div>
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
              <Input />
            </Field>
            <Field>
              <Label>내용</Label>
              <TextArea />
            </Field>
          </div>
          <div className="flex justify-end gap-[1rem]">
            <button
              onClick={onClose}
              className="px-[1.4rem] py-[0.8rem] border-[0.1rem] rounded-lg border-lightgray text-m font-semibold"
            >
              취소
            </button>
            <button className="px-[1.4rem] py-[0.8rem] border-[0.1rem] rounded-lg bg-lightblue text-white text-m font-semibold">
              저장
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
