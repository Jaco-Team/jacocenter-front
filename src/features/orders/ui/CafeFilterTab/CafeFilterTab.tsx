import { Text } from "@/shared/ui/Typography/Typography";
import "./CafeFilterTab.style.css";
import { CafeFilterTabProps } from "./CafeFilterTab.types";

export const CafeFilterTab = ({ cafe, isActive, onSelect }: CafeFilterTabProps) => {
  return (
    <div
      className={`cafe-filter ${
        isActive ? "cafe-filter-active" : "cafe-filter-default"
      }`}
      onClick={onSelect}
    >
      <Text className="text-text-secondary">{cafe}</Text>
    </div>
  );
};