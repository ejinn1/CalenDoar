import MiniCalendar from "../miniCalendar/index,";
import OptionBox from "../optionBox";

export default function SideMenu() {
  return (
    <section className="w-max h-full flex flex-col items-center gap-[2rem]">
      <MiniCalendar />
      <OptionBox />
    </section>
  );
}
