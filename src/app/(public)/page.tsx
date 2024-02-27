import Link from "next/link";
import tw from "tailwind-styled-components";
import Container from "../_component/container";

const StyledLink = tw.div`
  bg-white text-blue-700 hover:bg-blue-700 hover:text-white
  text-lg font-semibold
  py-3 px-6
  rounded-full
  shadow-lg
  transition duration-300 ease-in-out
  transform hover:-translate-y-1 hover:scale-105
`;

export default function Home() {
  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <Container>
        <Link href="/signin" passHref>
          <StyledLink>로그인</StyledLink>
        </Link>
        <Link href="/signup" passHref>
          <StyledLink>회원가입</StyledLink>
        </Link>
      </Container>
    </main>
  );
}
