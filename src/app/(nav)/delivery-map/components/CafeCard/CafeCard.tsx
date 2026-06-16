import { Text } from "@/shared/ui/Typography/Typography";
import Image from "next/image";
import { CafeCardProps } from "./CafeCard.types";

export const CafeCard = ({
  name,
  zoneNumber,
  deliveryPrice,
  isSelected,
  onClick,
}: CafeCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className={`w-[330px] text-left h-[152px] p-2 pb-3 flex flex-col gap-3 cursor-pointer rounded-lg bg-base
          ${isSelected ? "bg-bg-base-light shadow-[0px_4px_4px_0px_#3C3B3B29]" : ""}`}
    >
      <div className="flex items-center gap-2">
        <Image src="/icons/logo-bird.svg" alt="Лого" width={40} height={40} />
        <Text variant="body-l-medium-20" className="text-text-base">
          {name}
        </Text>
      </div>
      <div className="flex flex-col gap-2">
        <div
          className={`w-[68px] h-[32px] flex items-center justify-center rounded-lg border bg-base
            ${isSelected ? "border-accent" : "border-bg-base"}`}
        >
          <Text>Зона {zoneNumber}</Text>
        </div>
        <div className="flex flex-col gap-1">
          <Text>Ежедневно с 10:00 до 21:30</Text>
          <Text>Стоимость доставки: {deliveryPrice} руб.</Text>
        </div>
      </div>
    </button>
  );
};
