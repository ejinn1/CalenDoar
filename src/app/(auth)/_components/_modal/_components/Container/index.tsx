interface Prop {
  children: React.ReactNode;
}

export default function Container({ children }: Prop) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 dark:bg-opacity-40 flex items-center justify-center z-10 drop-shadow-md">
      <div className="relative bg-white dark:bg-gray p-[2rem] rounded-lg w-[40rem] h-[42rem] shadow-md">
        {children}
      </div>
    </div>
  );
}
