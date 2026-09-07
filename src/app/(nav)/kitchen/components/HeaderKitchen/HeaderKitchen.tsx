"use client";

import Image from "next/image";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Text } from "@/shared/ui/Typography/Typography";
import "./HeaderKitchen.style.css";
import { useKitchenStore } from "@/entities/Order/store/kitchen/kitchenStore";

export const HeaderKitchen = () => {
  const {
    orderNumber,
    foundOrderNumber,
    searched,
    setOrderNumber,
    clearOrderNumber,
    search,
  } = useKitchenStore();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") search();
  };

  return (
    <div className="header-kitchen-container">
      <Text variant="body-l-medium-20" className="header-kitchen-title">
        Кухня
      </Text>

      <div className="header-kitchen-search">
        <div className="relative">
          <Input
            type="number"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Поиск"
            error={
              orderNumber && searched && foundOrderNumber === null
                ? "Заказ с таким номером не найден"
                : undefined
            }
            className="header-kitchen-input"
          />
          {orderNumber && (
            <ClearButton onClick={clearOrderNumber} className="right-1 top-[1px]" />
          )}
        </div>
        <Button
          variant="base"
          theme="primary"
          size="sm"
          onClick={search}
          className="header-kitchen-search-btn"
          aria-label="Найти заказ"
        >
          <Image
            src="/icons/search.svg"
            alt=""
            width={18}
            height={18}
            className="brightness-0 invert"
          />
        </Button>
      </div>
    </div>
  );
};

const ClearButton = ({ onClick, className = "" }: { onClick: () => void; className?: string }) => (
  <button
    type="button"
    className={`absolute flex h-10 w-10 cursor-pointer items-center justify-center ${className}`}
    onClick={onClick}
  >
    <Image src="/icons/button-delete.svg" alt="Очистить" width={14} height={14} />
  </button>
);
