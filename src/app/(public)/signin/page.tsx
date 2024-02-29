"use client";

import Container from "@/app/_component/common/container";
import useUserInfo from "@/store/user/info";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import tw from "tailwind-styled-components";

const StyledForm = tw.form`
  p-4
`;

const Title = tw.h1`
  text-xl font-bold mb-8 p-[8rem]
`;

const FormField = tw.div`
  mb-6
`;

const Label = tw.label`
  block text-xs font-semibold mb-2
`;

const Input = tw.input`
  shadow-lg appearance-none border border-lightgray rounded-lg
  w-full py-3 px-4 text-gray-700 leading-tight
  focus:outline-none focus:shadow-outline text-lg
`;

const Button = tw.button`
  bg-lightgray hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-full text-lg
  focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105
`;

export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserInfo();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { username, password };
    setUser(user);

    router.replace(`/${username}`);
  };

  return (
    <main className="flex justify-center items-center w-screen h-screen bg-lightgray">
      <Container>
        <StyledForm onSubmit={handleSubmit}>
          <Title>Sign In</Title>
          <FormField>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </FormField>
          <FormField>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormField>
          <div className="flex justify-center mt-8">
            <Button type="submit">Sign In</Button>
          </div>
        </StyledForm>
      </Container>
    </main>
  );
}
