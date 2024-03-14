import tw from "tailwind-styled-components";

interface Props {
  children: React.ReactNode;
  className: string;
}

const Cell = tw.div`
  p-[1rem] font-medium text-[1.2rem]
`;

export default function DayCell({ children, className }: Props) {
  return <Cell className={`${className}`}>{children}</Cell>;
}
