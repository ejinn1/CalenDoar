import tw from "tailwind-styled-components";

interface Prop {
  children: React.ReactNode;
}

const Container = tw.div`
  bg-white rounded-lg w-full h-full min-w-[75rem] min-h-[70rem] flex justify-center
`;
export default function BackGroundContainer({ children }: Prop) {
  return <Container>{children}</Container>;
}
