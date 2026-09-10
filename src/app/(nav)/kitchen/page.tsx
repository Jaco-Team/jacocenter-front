"use client";

import { useEffect, useMemo, useState } from "react";
import { HeaderKitchen } from "./components/HeaderKitchen/HeaderKitchen";
import { KitchenFiltersBlock } from "./components/KitchenFiltersBlock/KitchenFiltersBlock";
import { TableKitchen } from "./components/TableKitchen/TableKitchen";
import type { KitchenOrder } from "./components/TableKitchen/TableKitchen.types";
import { CityDto, OrderDto, ordersApi, PointDto } from "@/entities/Order/api/ordersApi";
import { useKitchenStore } from "@/entities/Order/store/kitchen/kitchenStore";
import { ApiError } from "@/shared/api/http";

export default function Kitchen() {
  const [cities, setCities] = useState<CityDto[]>([]);
  const [points, setPoints] = useState<PointDto[]>([]);
  const [orderDtos, setOrderDtos] = useState<OrderDto[]>([]);
  const [error, setError] = useState("");
  const {
    cityId,
    selectedPointId,
    date,
    refreshKey,
    setCityId,
    setSelectedPointId,
  } = useKitchenStore();

  useEffect(() => {
    let active = true;

    void ordersApi
      .cities()
      .then(({ data }) => {
        if (!active) return;
        setCities(data);
        setError("");
        const currentCityId = useKitchenStore.getState().cityId;
        setCityId(
          currentCityId && data.some((city) => city.id === currentCityId)
            ? currentCityId
            : (data[0]?.id ?? null),
        );
      })
      .catch((reason: unknown) => {
        if (active) setError(errorMessage(reason));
      });

    return () => {
      active = false;
    };
  }, [setCityId]);

  useEffect(() => {
    if (!cityId) return;
    let active = true;

    void ordersApi
      .points(cityId)
      .then(({ data }) => {
        if (!active) return;
        setPoints(data);
        setError("");
        const currentPointId = useKitchenStore.getState().selectedPointId;
        setSelectedPointId(
          currentPointId && data.some((point) => point.id === currentPointId)
            ? currentPointId
            : (data[0]?.id ?? null),
        );
      })
      .catch((reason: unknown) => {
        if (active) setError(errorMessage(reason));
      });

    return () => {
      active = false;
    };
  }, [cityId, setSelectedPointId]);

  useEffect(() => {
    if (!selectedPointId) return;
    const apiDate = toApiDate(date);
    if (!apiDate) return;
    let active = true;

    void ordersApi
      .kitchenList({
        pointId: selectedPointId,
        date: apiDate,
      })
      .then(({ data }) => {
        if (!active) return;
        setOrderDtos(data.items);
        setError("");
      })
      .catch((reason: unknown) => {
        if (!active) return;
        setOrderDtos([]);
        setError(errorMessage(reason));
      });

    return () => {
      active = false;
    };
  }, [date, refreshKey, selectedPointId]);

  const visiblePoints = points.filter((point) => point.city_id === cityId);
  const cityName = cities.find((city) => city.id === cityId)?.name ?? "";
  const orders = useMemo(
    () =>
      orderDtos
        .filter((order) => order.point_id === selectedPointId)
        .map((order) => mapKitchenOrder(order, cityName)),
    [cityName, orderDtos, selectedPointId],
  );

  return (
    <div className="h-full flex flex-col gap-4">
      <HeaderKitchen cities={cities} orders={orders} />
      <KitchenFiltersBlock points={visiblePoints} orders={orders} />
      {error && <p className="text-error">{error}</p>}
      <TableKitchen orders={orders} />
    </div>
  );
}

const STATUS_MAP: Record<number, KitchenOrder["status"]> = {
  1: "inQueue",
  2: "cooking",
  3: "ready",
  4: "ready",
  5: "inDelivery",
  6: "completed",
};

const TYPE_MAP: Record<number, KitchenOrder["type"]> = {
  1: "delivery",
  2: "takeaway",
  3: "room",
  4: "toGo",
};

const mapKitchenOrder = (order: OrderDto, cityName: string): KitchenOrder => ({
  id: order.id,
  pointId: order.point_id,
  number: order.id,
  status: STATUS_MAP[order.status] ?? "inQueue",
  type: TYPE_MAP[order.type] ?? "delivery",
  orderedAt: formatTime(order.date_time_order),
  readyAt: "—",
  assembledAt: "—",
  preparedAt: "—",
  servedAt: "—",
  promisedIn: "—",
  city: cityName,
  cafe: order.point_name,
  amount: order.order_price,
  timeToOverdue: "—",
  promisedAt: formatTime(order.give_data_time || order.date_time_preorder),
  receivedAt: order.status === 6 ? formatTime(order.give_data_time) : "—",
  isPreorder: order.is_preorder,
});

const formatTime = (value: string | null) => {
  if (!value) return "—";
  const match = value.match(/\b(\d{2}:\d{2})/);
  return match?.[1] ?? value;
};

const toApiDate = (value: string) => {
  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  return match ? `${match[3]}-${match[2]}-${match[1]}` : undefined;
};

const errorMessage = (error: unknown) =>
  error instanceof ApiError ? error.message : "Не удалось загрузить данные";
