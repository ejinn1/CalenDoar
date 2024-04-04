import OptionBox from "./_components/optionBox";
import Profile from "./_components/profile";

export default function SideMenu() {
  return (
    <section className="w-[6rem] md:w-[17rem] h-full flex flex-col items-center gap-[1rem]">
      <Profile />
      <OptionBox />
    </section>
  );
}
