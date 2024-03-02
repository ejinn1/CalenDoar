import tw from "tailwind-styled-components";
import MiniCalendar from "../miniCalendar/index,";

const StyledMain = tw.main`
    w-full h-full
    flex
`;

export default function Main() {
  return (
    <StyledMain>
      <section className="min-w-[24rem] h-full p-2 border-r-2 border-lightgray flex flex-col items-center">
        <MiniCalendar />
        <div className="w-full border-t border-lightgray my-4"></div>
        <div>옵션</div>
      </section>
      <section className=" w-full h-full">캘린더</section>
    </StyledMain>
  );
}
