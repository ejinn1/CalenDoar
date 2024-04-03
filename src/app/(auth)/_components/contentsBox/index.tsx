interface Prop {
  children: React.ReactNode;
}

export default function ContentsBox({ children }: Prop) {
  return (
    <article className="bg-white rounded-lg w-full h-full p-[1rem] dark:bg-darkgray">
      {children}
    </article>
  );
}
