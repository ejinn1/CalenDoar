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
  relative p-[0.5rem] font-medium text-r
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
