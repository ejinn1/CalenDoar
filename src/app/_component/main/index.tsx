import tw from "tailwind-styled-components";
import Calendar from "../calendar";

const StyledMain = tw.main`
    w-full h-full
    flex
`;

export default function Main() {
  return (
    <StyledMain>
      <section className="w-full h-full">
        <Calendar />
      </section>
    </StyledMain>
  );
}
