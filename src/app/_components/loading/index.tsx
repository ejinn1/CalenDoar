import { PiSpinnerGapLight } from "react-icons/pi";

interface Prop {
  size: number;
}

export default function Loading({ size }: Prop) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <PiSpinnerGapLight size={size} className="animate-spin" />
    </div>
  );
}
