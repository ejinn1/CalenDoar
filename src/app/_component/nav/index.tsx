import tw from "tailwind-styled-components";

const NavContainer = tw.nav`
  group
  fixed top-0 left-0 h-[8rem] w-full px-[2rem] pt-[2rem]
  flex justify-center items-center
`;

const StyledNav = tw.div`
  w-full h-full bg-lightgray rounded-lg px-[4rem]
  flex justify-between items-center
  transition-bg duration-300 ease-in-out
`;

const StyledUl = tw.ul`
    flex gap-[1.5rem] text-m
`;

export default function Nav() {
  return (
    <NavContainer>
      <StyledNav>
        <div className="text-l font-bold">Calendar</div>
        <div>
          <StyledUl>
            <li>일정</li>
            <li>할일</li>
            <li>프로필</li>
          </StyledUl>
        </div>
      </StyledNav>
    </NavContainer>
  );
}
