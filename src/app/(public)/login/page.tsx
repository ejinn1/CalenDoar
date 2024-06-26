"use client";

import { createClient } from "@/libs/supabase/client";
import { useRouter } from "next/navigation";

import { useState } from "react";
import tw from "tailwind-styled-components";

const SimpleLoginBox = tw.div`
  w-full border-[0.1rem] p-[1rem] rounded-md text-r cursor-pointer
  transition-bg duration-300 ease-in-out
`;

const Box = tw.div`
  flex flex-col gap-2
`;

const Label = tw.label`
  text-m font-bold
`;

const Input = tw.input`
  p-[1.5rem] border-lightgray border-[0.1rem] rounded-md outline-none
  text-r
`;

const Form = tw.form`
    flex flex-col gap-[1rem]
`;

// 간편 로그인 추가해야됨,
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <main className="w-[40rem] flex flex-col items-center">
      <div className="w-full h-full p-[4rem] flex flex-col justify-between">
        <h1 className="text-xxl font-bold">Hi~</h1>
        <div>
          {/* 간편 로그인 예시 */}
          <div className="flex flex-col gap-2">
            <SimpleLoginBox className="border-lightgray hover:bg-lightgray">
              구글
            </SimpleLoginBox>
            <SimpleLoginBox className="border-lightyellow hover:bg-lightyellow">
              카카오
            </SimpleLoginBox>
            <SimpleLoginBox className="border-gray hover:bg-gray">
              깃허브
            </SimpleLoginBox>
          </div>
          <div className="relative text-lightgray text-center pt-[3rem] pb-[2rem] flex gap-[1rem] justify-center items-center">
            <div className="flex-grow border-t-[0.1rem] border-lightgray"></div>
            <span className="text-r uppercase">or</span>
            <div className="flex-grow border-t border-lightgray"></div>
          </div>
          <Form onSubmit={handleLogin}>
            <div className="flex flex-col gap-[1rem]">
              <Box>
                <Label>이메일</Label>
                <Input
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box className="relative">
                <Label>비밀번호</Label>
                <Input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
              <Box className=" items-end text-s text-gray">
                <button>비밀번호 찾기</button>
              </Box>
            </div>
            <button
              type="submit"
              className="bg-lightgray dark:bg-gray p-[1.5rem] rounded-lg text-r transition-bg duration-300 ease-in-out hover:bg-lightblue dark:hover:bg-blue"
            >
              로그인
            </button>
          </Form>
        </div>
        <div className="w-full p-[1rem] text-center text-gray flex gap-[2rem] justify-center">
          <span>계정이 없으신가요?</span>
          <button
            onClick={() => router.push("/signup")}
            className="text-lightblue"
          >
            가입하기
          </button>
        </div>
      </div>
    </main>
  );
}
