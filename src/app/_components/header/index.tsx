"use client";

import Image from "next/image";
import { useState } from "react";
import tw from "tailwind-styled-components";

const Container = tw.header`
  group
  fixed top-0 left-0 w-full px-[2rem] pt-[2rem] z-10
  flex justify-center items-center
  transition-height duration-300 ease-in-out
`;

const StyledNav = tw.div`
  relative
  w-full h-full bg-lightgray rounded-lg px-[4rem] pt-[2rem]
  flex justify-between items-start
`;

// Option박스 섹션추가, 간격맞추기 해야됨
export default function Header() {
  const [extended, setExtended] = useState(false);

  return (
    <Container className={`${extended ? "h-[30rem]" : "h-[8rem]"}`}>
      {extended && (
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm bg-black/20 "></div>
      )}
      <StyledNav>
        <div className="text-l font-bold">CalenDoar</div>
        <div className="flex gap-[2rem]">
          <div
            onClick={() => setExtended((prev) => !prev)}
            className={`cursor-pointer opacity-100 hover:opacity-50 transition-opacity duration-300 ease-in-out`}
          >
            {extended ? (
              <Image src="/close.png" alt="닫기" width={20} height={20} />
            ) : (
              <Image src="/menu.png" alt="메뉴" width={20} height={20} />
            )}
          </div>
        </div>
      </StyledNav>
    </Container>
  );
}
