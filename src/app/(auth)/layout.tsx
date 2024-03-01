import { ReactNode } from "react";
import Nav from "../_component/common/nav";

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}
