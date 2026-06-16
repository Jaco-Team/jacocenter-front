import { Text } from "@/shared/ui/Typography/Typography";
import "./Slot.style.css";
import { SlotProps } from "./Slot.types";

export const Slot = ({ variant, isActive, onClick, children }: SlotProps) => (
  <div onClick={ onClick } className={`slot ${variant} ${isActive ? `${variant}Active` : `${variant}Default`}`}>
    <Text>{children}</Text>
  </div>
);