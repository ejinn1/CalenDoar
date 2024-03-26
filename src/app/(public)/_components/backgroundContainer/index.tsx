import tw from "tailwind-styled-components";

interface Prop {
  children: React.ReactNode;
}

const Container = tw.div`
  bg-white rounded-lg w-full h-full min-w-[50rem] min-h-[65rem] flex justify-center
  relative
`;

export default function BackGroundContainer({ children }: Prop) {
  return <Container>{children}</Container>;
}
