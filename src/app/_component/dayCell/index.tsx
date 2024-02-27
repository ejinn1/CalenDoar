import tw from "tailwind-styled-components";

interface CalendarCellProp {
  day: number | null;
}

const CellContainer = tw.div`
  w-[6rem] h-[8rem] shadow-md
  p-2 rounded-md text-center
  transition-opacity duration-300 ease-in-out
`;

export function DayCell({ day }: CalendarCellProp) {
  const additionalClasses = day
    ? "hover:bg-lightgray opacity-100 cursor-pointer "
    : "opacity-0";

  return (
    <CellContainer className={`${additionalClasses}`}>
      {day ?? ""}
    </CellContainer>
  );
}
