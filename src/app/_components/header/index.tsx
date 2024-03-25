"use client";

import Image from "next/image";
import { useState } from "react";
import tw from "tailwind-styled-components";

const Container = tw.header`
  group
  fixed top-0 left-0 w-full px-[1rem] pt-[1rem] z-10 h-[8rem]
  flex justify-center items-start

`;

const StyledNav = tw.div`
  relative
  w-full rounded-lg px-[2rem] bg-lightgray pt-[1.2rem]
  flex justify-between
  transition-height duration-300 ease-in-out
`;

export default function Header() {
  const [extended, setExtended] = useState(false);

  return (
    <Container>
      {extended && (
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm bg-black/20 "></div>
      )}
      <StyledNav className={`${extended ? "h-[20rem]" : "h-[4rem]"}`}>
        <div className="text-l font-bold">CalenDoar</div>
        <div className="flex">
          <div
            onClick={() => setExtended((prev) => !prev)}
            className={`cursor-pointer opacity-100 hover:opacity-50 transition-opacity duration-300 ease-in-out`}
          >
            {extended ? (
              <Image src="/close.png" alt="닫기" width={16} height={16} />
            ) : (
              <Image src="/menu.png" alt="메뉴" width={16} height={16} />
            )}
          </div>
        </div>
      </StyledNav>
    </Container>
  );
}
