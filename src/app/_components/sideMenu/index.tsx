import OptionBox from "./_components/optionBox";
import Profile from "./_components/profile";

export default function SideMenu() {
  return (
    <section className="w-max h-full flex flex-col items-center gap-[2rem]">
      {/* <MiniCalendar /> */}
      <Profile />
      <OptionBox />
    </section>
  );
}
