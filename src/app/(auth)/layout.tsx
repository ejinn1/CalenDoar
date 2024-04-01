import AuthProvider from "@/providers/AuthProvider";
import BackGround from "../_components/backGround";
import Header from "../_components/header";
import SideMenu from "../_components/sideMenu";

interface Prop {
  children: React.ReactNode;
}

export default function Layout({ children }: Prop) {
  return (
    <AuthProvider>
      <BackGround>
        <Header />
        <SideMenu />
        {children}
      </BackGround>
    </AuthProvider>
  );
}
