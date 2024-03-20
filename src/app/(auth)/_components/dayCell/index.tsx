"use client";

import tw from "tailwind-styled-components";

interface Props {
  children: React.ReactNode;
  className: string;
  day: Date | null;
  onOpen: () => void;
  setClickedDay: (day: Date) => void;
}

const Cell = tw.div`
  p-[1rem] font-medium text-[1.2rem]
`;

export default function DayCell({
  children,
  className,
  day,
  onOpen,
  setClickedDay,
}: Props) {
  return (
    <Cell
      onClick={() => {
        if (day) {
          setClickedDay(day);
          onOpen();
        }
      }}
      className={`${className}`}
    >
      {children}
    </Cell>
  );
}
