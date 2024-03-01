"use client";

import tw from "tailwind-styled-components";

const StyledNav = tw.nav`
  group
  fixed top-0 left-0 h-full
  w-[4rem] hover:w-[16rem]
  transition-width duration-300
  overflow-hidden
  bg-lightgray text-white
  hover:bg-gray
`;

const StyledUl = tw.ul`
  flex flex-wrap flex-col
  list-none p-5
`;

const ContentContainer = tw.div`
  opacity-0 group-hover:opacity-100
  transition-opacity duration-300
`;

const StyledLi = tw.li`
  my-2 cursor-pointer
  hover:text-black
  text-xxs
`;

export default function Nav() {
  return (
    <StyledNav>
      <StyledUl>
        <ContentContainer>
          <StyledLi>홈</StyledLi>
        </ContentContainer>
        <ContentContainer>
          <StyledLi>일정</StyledLi>
        </ContentContainer>
        <ContentContainer>
          <StyledLi>toDo</StyledLi>
        </ContentContainer>
      </StyledUl>
    </StyledNav>
  );
}
