"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Text } from "@/shared/ui/Typography/Typography";
import { SelectTown } from "@/shared/ui/SelectTown/SelectTown";
import { CityDto, ordersApi } from "@/entities/Order/api/ordersApi";
import { useKitchenStore } from "@/entities/Order/store/kitchen/kitchenStore";
import { StatusTabId } from "@/widgets/orders/utils/constants";
import type { KitchenOrder } from "../TableKitchen/TableKitchen.types";
import "./HeaderKitchen.style.css";

type HeaderKitchenProps = {
  cities: Array<Pick<CityDto, "id" | "name">>;
  orders: KitchenOrder[];
};

export const HeaderKitchen = ({ cities, orders }: HeaderKitchenProps) => {
  const {
    orderNumber,
    foundOrderNumber,
    searched,
    cityId,
    setCityId,
    setOrderNumber,
    clearOrderNumber,
    setFoundOrder,
  } = useKitchenStore();
  const [isSearching, setIsSearching] = useState(false);

  const selectedCity = cities.find((city) => city.id === cityId);

  const search = async () => {
    const query = orderNumber.trim();
    if (!query) return;

    const localMatch = orders.find((order) => String(order.number) === query);
    if (localMatch) {
      setFoundOrder({
        foundOrderNumber: localMatch.number,
        searched: true,
        selectedPointId: localMatch.pointId,
        statusTab: statusTabForOrder(localMatch),
      });
      return;
    }

    const orderId = Number(query);
    if (!Number.isFinite(orderId) || orderId <= 0) {
      setFoundOrder({ foundOrderNumber: null, searched: true });
      return;
    }

    setIsSearching(true);
    try {
      const { data } = await ordersApi.kitchenShow(orderId);
      let nextStatusTab: StatusTabId = "active";
      if (data.status === 6) nextStatusTab = "completed";
      else if (data.is_preorder) nextStatusTab = "preorder";

      const { data: allPoints } = await ordersApi.points();
      const point = allPoints.find((item) => item.id === data.point_id);

      setFoundOrder({
        foundOrderNumber: data.id,
        searched: true,
        cityId: point?.city_id,
        selectedPointId: data.point_id,
        statusTab: nextStatusTab,
      });
    } catch {
      setFoundOrder({ foundOrderNumber: null, searched: true });
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") void search();
  };

  return (
    <div className="header-kitchen-container">
      <div className="header-kitchen-left">
        <Text variant="body-l-medium-20" className="header-kitchen-title">
          Кухня
        </Text>
        <SelectTown
          options={cities.map((city) => city.name)}
          value={selectedCity?.name}
          onSelect={(name) => {
            const city = cities.find((item) => item.name === name);
            setCityId(city?.id ?? null);
          }}
          dropdownClassName="w-full left-0"
          className="w-[196px] shrink-0"
        />
      </div>

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
          onClick={() => void search()}
          className="header-kitchen-search-btn"
          aria-label="Найти заказ"
          disabled={isSearching}
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

const statusTabForOrder = (order: KitchenOrder): StatusTabId => {
  if (order.status === "cancel") return "cancelled";
  if (order.status === "completed") return "completed";
  if (order.isPreorder) return "preorder";
  return "active";
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
