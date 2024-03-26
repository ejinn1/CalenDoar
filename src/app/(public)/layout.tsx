import LoginFooter from "./_components/LoginFooter";
import LoginHeader from "./_components/LoginHeader";

interface Prop {
  children: React.ReactNode;
}

export default function Layout({ children }: Prop) {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-between">
      <LoginHeader />
      {children}
      <LoginFooter />
    </div>
  );
}
