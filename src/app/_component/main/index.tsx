import tw from "tailwind-styled-components";

const StyledMain = tw.main`
    w-full h-full
    flex
`;

export default function Main() {
  return (
    <StyledMain>
      <aside className="bg-red-300 w-[40rem] h-full ">
        <div>미니 캘린더</div>
        <div>옵션</div>
      </aside>
      <aside className="bg-blue-300 w-full h-full">캘린더</aside>
    </StyledMain>
  );
}
