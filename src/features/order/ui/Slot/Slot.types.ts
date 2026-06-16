export interface SlotProps {
  variant: "daySlot" | "timeSlot";
  isActive: boolean;
  onClick: () => void;
  children: string;
}