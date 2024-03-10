import MiniCalendar from "./_components/miniCalendar";
import OptionBox from "./_components/optionBox";

export default function SideMenu() {
  return (
    <section className="w-max h-full flex flex-col items-center gap-[2rem]">
      <MiniCalendar />
      <OptionBox />
    </section>
  );
}
