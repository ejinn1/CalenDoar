import OptionBox from "./_components/optionBox";
import Profile from "./_components/profile";

export default function SideMenu() {
  return (
    <section className="hidden md:min-w-[14rem] h-full md:flex flex-col items-center gap-[1rem]">
      <Profile />
      <OptionBox />
    </section>
  );
}
