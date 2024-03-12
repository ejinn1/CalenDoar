interface Prop {
  children: React.ReactNode;
}

export default function Layout({ children }: Prop) {
  return (
    <div className="w-screen h-screen bg-lightgray flex justify-center items-center p-[10rem]">
      {children}
    </div>
  );
}
