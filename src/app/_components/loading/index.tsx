import { PiSpinnerGapLight } from "react-icons/pi";

interface Prop {
  size: number;
}

export default function Loading({ size }: Prop) {
  return <PiSpinnerGapLight size={size} className="animate-spin" />;
}
