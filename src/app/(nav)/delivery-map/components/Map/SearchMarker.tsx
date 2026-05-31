import Image from "next/image";
import { Text } from "@/shared/ui/Typography/Typography";
import { SearchMarkerProps } from "./SearchMarker.types";

export const SearchMarker = ({ address }: SearchMarkerProps) => (
  <div className="relative">
    <div className="absolute h-8 w-5 -translate-x-1/2 -translate-y-full">
      <Image
        src="/icons/marker-error.svg"
        alt=""
        fill
      />
    </div>
    <div className="absolute left-4 -top-4 -translate-y-1/2 whitespace-nowrap rounded-lg bg-base px-3 py-1.5 shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
      <Text variant="label-s-regular-12" className="text-text-secondary">
        {address}
      </Text>
    </div>
  </div>
);
