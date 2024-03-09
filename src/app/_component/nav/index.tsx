"use client";

import Image from "next/image";
import { useState } from "react";
import tw from "tailwind-styled-components";

const NavContainer = tw.nav`
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

const StyledUl = tw.ul`
    flex gap-[1.5rem] text-m
`;

const ExtendedNav = tw.div`
  absolute top-[5rem] left-0 w-full bg-lightgray rounded-b-lg
  transition-height duration-300 ease-in-out
`;

// Option박스 섹션추가, 간격맞추기 해야됨

export default function Nav() {
  const [extended, setExtended] = useState(false);

  return (
    <NavContainer className={`${extended ? "h-[30rem]" : "h-[8rem]"}`}>
      <StyledNav>
        <div className="text-l font-bold">Calendar</div>
        <div className="flex gap-[2rem]">
          <div>
            {/* <StyledUl>
              <li>일정</li>
              <li>할일</li>
              <li>프로필</li>
            </StyledUl> */}
          </div>
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
        {/* <ExtendedNav>목록</ExtendedNav> */}
      </StyledNav>
    </NavContainer>
  );
}
