import Nav from "../_component/nav";

interface Prop {
  children: React.ReactNode;
}

export default function Layout({ children }: Prop) {
  return (
    <div className="relatvie">
      <Nav />
      {children}
    </div>
  );
}
