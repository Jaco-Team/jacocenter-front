import { Text } from "@/shared/ui/Typography/Typography";
import { CafeMarkerProps } from "./CafeMarker.types";

export const CafeMarker = ({ cafe, isSelected }: CafeMarkerProps) => (
  <div className="relative">
    <div
      className={`absolute flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-base text-text-secondary shadow-[0px_4px_4px_4px_#3C3B3B29] ${
        isSelected
          ? "h-13 w-13 border-2 border-accent"
          : "h-10 w-10 border border-primary"
      }`}
    >
      <Text variant="body-l-regular-20">{cafe.id}</Text>
    </div>
    {isSelected && (
      <div className="absolute left-8 top-0 flex h-13 -translate-y-1/2 items-center text-nowrap rounded-xl border-2 border-accent bg-base px-3 shadow-[0px_4px_4px_4px_#3C3B3B29]">
        <Text className="text-text-secondary">{cafe.address}</Text>
      </div>
    )}
  </div>
);
