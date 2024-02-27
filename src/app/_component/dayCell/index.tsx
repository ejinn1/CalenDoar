import tw from "tailwind-styled-components";

interface CalendarCellProp {
  day: number | null;
}

// 조건부 스타일링을 위한 함수를 제거하고, 기본 스타일만 정의합니다.
const CellContainer = tw.div`
  w-[6rem] h-[8rem] shadow-md
  p-2 rounded-md text-center
  transition-opacity duration-300 ease-in-out
`;

export function DayCell({ day }: CalendarCellProp) {
  // 여기서 isDay 조건에 따라 클래스를 추가합니다.
  const additionalClasses = day
    ? "hover:bg-blue-200 opacity-100 cursor-pointer "
    : "opacity-0";

  return (
    <CellContainer className={`${additionalClasses}`}>
      {day ?? ""}
    </CellContainer>
  );
}
