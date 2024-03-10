interface Prop {
  onClose: () => void;
}

export default function AddOptionModal({ onClose }: Prop) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center z-10">
      <div className="bg-white p-[2rem] rounded-lg w-[40rem] h-[40rem] shadow-md">
        <h1>옵션 추가 모달</h1>
        <span onClick={onClose}>X</span>
      </div>
    </div>
  );
}
