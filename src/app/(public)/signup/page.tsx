"use client";

import { createClient } from "@/libs/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import tw from "tailwind-styled-components";

{
  /* <div className="relative w-full h-full overflow-hidden bg-gray-100">
        <div className="absolute w-64 h-64 rounded-full bg-purple-300 opacity-70 -top-10 -left-10"></div>
        <div className="absolute w-48 h-48 rounded-full bg-blue-300 opacity-70 top-20 right-20"></div>
        <div className="absolute w-72 h-72 rounded-full bg-pink-300 opacity-70 -bottom-20 -right-10"></div>
        <div className="absolute w-36 h-36 rounded-full bg-green-300 opacity-70 bottom-10 left-20"></div>
      </div> */
}

const BackContainer = tw.div`
  absolute top-[2rem] left-[2rem] cursor-pointer opacity-50
  transition-all duration-300 ease-in-out
  hover:opacity-100
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
  flex flex-col gap-[5rem]
`;

const ErrorMessage = tw.div`
  absolute -bottom-[2rem] left-0"
`;

// 이메일 인증 X
export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const supabase = createClient();
  const router = useRouter();

  const handelSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          user_name: name,
        },
      },
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/login");
    }
  };

  return (
    <main className="w-[40rem] flex flex-col items-center">
      <BackContainer>
        <Link href={"/login"}>
          <IoIosArrowBack size={20} />
        </Link>
      </BackContainer>
      <div className="min-w-[40rem] w-full max-w-[80rem] h-full px-[4rem] py-[2rem] flex flex-col justify-between gap-[5rem]">
        <h1 className="text-xxl font-bold">회원가입</h1>
        <Form onSubmit={handelSignUp}>
          <div className="flex flex-col gap-[3rem]">
            <Box>
              <Label>이름</Label>
              <Input
                type="name"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
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
                placeholder="비밀번호 (6자리 이상)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password.length < 6 && password.length !== 0 && (
                <ErrorMessage>
                  <span className="text-lightred text-r font-medium">
                    비밀번호는 6자리 이상을 입력해주세요
                  </span>
                </ErrorMessage>
              )}
            </Box>
            <Box className="relative">
              <Label>비밀번호 확인</Label>
              <Input
                type="password"
                placeholder="비밀번호 확인"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
              />
              {password !== checkPassword && checkPassword !== "" && (
                <ErrorMessage>
                  <span className="text-lightred text-r font-medium">
                    비밀번호가 일치하지 않아요
                  </span>
                </ErrorMessage>
              )}
            </Box>
          </div>
          <button
            type="submit"
            className="bg-lightgray p-[1.5rem] rounded-lg text-r transition-bg duration-300 ease-in-out hover:bg-lightblue"
          >
            회원가입
          </button>
        </Form>
      </div>
    </main>
  );
}
