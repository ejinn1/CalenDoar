import Link from "next/link";
import tw from "tailwind-styled-components";

const SignContainer = tw.aside`
  flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4
`;

const StyledLink = tw.div`
  text-blue-500 hover:text-blue-700 text-lg font-semibold
  p-2 m-2
  rounded-lg border border-blue-500 hover:border-blue-700 transition duration-300
`;

export default function Home() {
  return (
    <main>
      <SignContainer>
        <Link href="/signin" passHref>
          <StyledLink>로그인</StyledLink>
        </Link>
        <Link href="/signup" passHref>
          <StyledLink>회원가입</StyledLink>
        </Link>
      </SignContainer>
    </main>
  );
}
