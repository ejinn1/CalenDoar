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
        <div className="w-screen h-screen gap-[1rem] flex flex-col">
          <Header />
          <div className="w-full h-[calc(100%-7rem)] gap-[1rem] flex">
            <SideMenu />
            {children}
          </div>
        </div>
      </BackGround>
    </AuthProvider>
  );
}
