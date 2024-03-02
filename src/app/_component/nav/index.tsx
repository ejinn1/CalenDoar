import tw from "tailwind-styled-components";

const StyledNav = tw.nav`
    group
    fixed top-0 left-0 h-[8rem] bg-lightgray w-full p-2 px-[8rem]
    flex justify-between items-center
    transition-bg duration-300 ease-in-out
    hover:bg-gray
`;

const StyledUl = tw.ul`
    flex gap-4 text-xs
    group-hover:text-lightgray
`;

export default function Nav() {
  return (
    <StyledNav>
      <div className="text-xs font-semibold">Calendar</div>
      <div>
        <StyledUl>
          <li>일정</li>
          <li>할일</li>
          <li>프로필</li>
        </StyledUl>
      </div>
    </StyledNav>
  );
}
