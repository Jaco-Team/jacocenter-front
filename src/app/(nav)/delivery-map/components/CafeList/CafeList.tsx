import { Text } from "@/shared/ui/Typography/Typography";
import Image from "next/image";
import React from "react";
import { CafeCard } from "../CafeCard/CafeCard";
import { CafeListProps } from "./CafeList.types";
import { useOrderStore } from "@/entities/Order/store/new-order/orderStore";
import { mockCities } from "@/app/(nav)/order-new/data/mocks";
import { cafes } from "../../data/constants";
import { Button } from "@/shared/ui/Button/Button";
import { useRouter } from "next/navigation";

export const CafeList = ({ selectedCafeId, onToggleCafe }: CafeListProps) => {
  const [isCitiesOpen, setIsCitiesOpen] = React.useState(false);
  const citySelectRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  const city = useOrderStore((state) => state.city);
  const setCity = useOrderStore((state) => state.setCity);

  React.useEffect(() => {
    if (!isCitiesOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!citySelectRef.current?.contains(event.target as Node)) {
        setIsCitiesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isCitiesOpen]);

  const handleConfirm = () => {
    router.push("/order-new");
  };

  return (
    <div className="h-full flex flex-col gap-3">
      <Button
        variant="base"
        theme="primary"
        onClick={handleConfirm}
        className="shrink-0 h-14 bg-primary text-base rounded-xl cursor-pointer whitespace-pre-line flex items-center justify-center text-center"
      >
        <Text variant="body-m-medium-16">{"Перейти\nк оформлению заказа"}</Text>
      </Button>

      <div className="flex-1 min-h-0 bg-base rounded-xl text-text-secondary px-3 py-4 flex flex-col gap-3">
        <div className="shrink-0 h-[82px] border-b border-bg-base-light flex flex-col gap-3">
          <div className="relative pl-2" ref={citySelectRef}>
            <button
              className="w-[127px] h-[42px] cursor-pointer flex items-center gap-1"
              onClick={() => setIsCitiesOpen((prev) => !prev)}
            >
              <Image
                src="/icons/marker-error.svg"
                alt="Карта"
                width={16}
                height={24}
              />
              <Text variant="body-l-regular-20" className="text-accent pl-1">
                {city}
              </Text>
            </button>

            {isCitiesOpen && (
              <ul className="absolute z-10 left-0 top-full mt-1.5 py-3 flex flex-col gap-1 bg-base rounded-lg shadow-[0px_4px_4px_0px_#3C3B3B29] w-[329px] border border-bg-base-light">
                {mockCities.map((cityOption) => (
                  <li key={cityOption}>
                    <button
                      className="w-full h-10 px-3 flex items-center cursor-pointer hover:bg-bg-base-light"
                      onClick={() => {
                        setCity(cityOption);
                        setIsCitiesOpen(false);
                      }}
                    >
                      <Text
                        className={cityOption === city ? "text-primary" : ""}
                      >
                        {cityOption}
                      </Text>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Text className="pl-2">Кафе и зоны доставки:</Text>
        </div>

        <ul className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2">
          {cafes.map((cafe) => (
            <li key={cafe.id} className="pb-3 border-b border-bg-base">
              <CafeCard
                name={cafe.address}
                zoneNumber={cafe.id}
                deliveryPrice={cafe.deliveryPrice}
                isSelected={cafe.id === selectedCafeId}
                onClick={() => onToggleCafe(cafe.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
