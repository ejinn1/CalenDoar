import Calendar from "@/app/_component/calendar";
import List from "@/app/_component/list";
import tw from "tailwind-styled-components";

const MainContainer = tw.main`
  flex justify-center mx-auto pt-[5rem]
  space-x-[5rem] min-w-[105rem] 
`;

export default function Home() {
  return (
    <MainContainer>
      <Calendar />
      <List />
    </MainContainer>
  );
}
