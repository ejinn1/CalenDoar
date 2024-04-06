interface Prop {
  type: "hour" | "minute";
  onSelect: (value: number) => void;
  onClose: () => void;
}

export default function TimeSelect({ type, onSelect, onClose }: Prop) {
  return (
    <div className="absolute bg-white dark:bg-darkgray z-10 border-2 rounded-lg border-lightgray top-0 left-0 h-[10rem] p-2 overflow-scroll flex flex-col text-center">
      {type === "hour" ? (
        <>
          {Array.from({ length: 25 }).map((_, index) => (
            <span
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(index);
                onClose();
              }}
              className="cursor-pointer hover:bg-lightgray dark:hover:bg-gray rounded-md "
            >
              {index}
            </span>
          ))}
        </>
      ) : (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <span
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(index * 10);
                onClose();
              }}
              className="cursor-pointer hover:bg-lightgray dark:hover:bg-gray rounded-md "
            >
              {index === 0 ? index.toString().padStart(2, "0") : index * 10}
            </span>
          ))}
        </>
      )}
    </div>
  );
}
