import MiniCalendar from "./_component/miniCalendar/index,";
import OptionBox from "./_component/optionBox";

export default function SideMenu() {
  return (
    <section className="w-max h-full flex flex-col items-center gap-[2rem]">
      <MiniCalendar />
      <OptionBox />
    </section>
  );
}
