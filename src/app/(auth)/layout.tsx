import Nav from "../_components/nav";
import SideMenu from "../_components/sideMenu";

interface Prop {
  children: React.ReactNode;
}

export default function Layout({ children }: Prop) {
  return (
    <div className="pt-[10rem] w-screen h-screen bg-gray flex gap-[2rem] p-[2rem]">
      <Nav />
      <SideMenu />
      {children}
    </div>
  );
}
