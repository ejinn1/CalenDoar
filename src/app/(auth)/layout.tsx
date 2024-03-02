import Nav from "../_component/nav";

interface Prop {
  children: React.ReactNode;
}

export default function Layout({ children }: Prop) {
  return (
    <div className="pt-[8rem] w-screen h-screen">
      <Nav />
      {children}
    </div>
  );
}
