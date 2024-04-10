"use client";

interface Props {
  closeDel: () => void;
  handleDelete: () => void;
}

export default function DeleteModal({ closeDel, handleDelete }: Props) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center z-10 drop-shadow-md">
      <div className="relative flex flex-col justify-center gap-[2rem] w-[30rem] h-[14rem] shadow-md rounded-lg bg-white dark:bg-darkgray">
        <div className="text-l font-bold flex justify-center items-center">
          삭제 할꺼?
        </div>
        <div className="flex justify-center gap-[2rem] w-full">
          <button
            onClick={closeDel}
            className="px-[1.4rem] py-[0.8rem] rounded-lg bg-lightgray dark:bg-gray text-white text-m font-semibold"
          >
            아니
          </button>
          <button
            onClick={handleDelete}
            className="px-[1.4rem] py-[0.8rem] rounded-lg bg-lightred text-white text-m font-semibold"
          >
            응
          </button>
        </div>
      </div>
    </div>
  );
}
