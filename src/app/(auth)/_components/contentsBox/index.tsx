interface Prop {
  children: React.ReactNode;
}

export default function ContentsBox({ children }: Prop) {
  return (
    <article className="bg-white rounded-lg w-full h-full p-[1rem] shadow-md dark:bg-darkgray transition-bg duration-300 ease-in">
      {children}
    </article>
  );
}
