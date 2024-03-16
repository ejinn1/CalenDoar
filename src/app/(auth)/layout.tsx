import AuthProvider from "@/providers/AuthProvider";
import Header from "../_components/header";
import SideMenu from "../_components/sideMenu";

interface Prop {
  children: React.ReactNode;
}

export default function Layout({ children }: Prop) {
  return (
    <AuthProvider>
      <div className="pt-[10rem] w-screen h-screen bg-gray flex gap-[2rem] p-[2rem]">
        <Header />
        <SideMenu />
        {children}
      </div>
    </AuthProvider>
  );
}
