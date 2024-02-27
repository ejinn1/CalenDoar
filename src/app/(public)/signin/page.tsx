"use client";

import React, { useState } from "react";
import tw from "tailwind-styled-components";

// 스타일링된 컴포넌트 정의
const Container = tw.main`
  flex justify-center items-center h-screen bg-lightgray
`;

const StyledForm = tw.form`
  p-12 bg-white rounded-xl shadow-xl
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ username, password });
  };

  return (
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
  );
}
