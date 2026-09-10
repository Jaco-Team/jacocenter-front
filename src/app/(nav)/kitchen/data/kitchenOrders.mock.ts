import { KitchenOrder } from "../components/TableKitchen/TableKitchen.types";

export const cityOptions = ["Тольятти", "Самара"];
export const cafeOptions = ["Ленинградская 47", "Ворошилова 12 а", "Матросова 32", "Цветной 1"];

export const mockKitchenOrders: KitchenOrder[] = Array.from({ length: 200 }, (_, i) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  const statuses = ["inQueue", "cooking", "inDelivery", "ready", "cancel", "completed"] as const;
  const types = ["room", "delivery", "takeaway", "toGo"] as const;
  const minutesLeft = (i * 5) % 45;
  const status = statuses[i % statuses.length];

  return {
    id: i + 800000,
    pointId: (i % 4) + 1,
    number: i + 800000,
    city: cityOptions[i % 2],
    cafe: cafeOptions[i % 4],
    status,
    type: types[i % types.length],
    orderedAt: `${pad(10 + (i % 8))}:${pad((i * 3) % 60)}`,
    readyAt: `${pad(11 + (i % 8))}:${pad((i * 5) % 60)}`,
    assembledAt: `${pad(11 + (i % 8))}:${pad((i * 5 + 5) % 60)}`,
    closedAt: i % 6 === 0 ? undefined : `${pad(12 + (i % 6))}:${pad((i * 4) % 60)}`,
    preparedAt: `${pad(11 + (i % 7))}:${pad((i * 6) % 60)}`,
    servedAt: `${pad(12 + (i % 6))}:${pad((i * 4 + 10) % 60)}`,
    promisedIn: (["15-30", "30-60", "60-90"] as const)[i % 3],
    amount: 500 + (i % 40) * 150,
    timeToOverdue: `00:${pad(minutesLeft)}:00`,
    promisedAt: `${pad(11 + (i % 8))}:${pad((i * 3) % 60)}`,
    receivedAt: status === "completed" ? `${pad(12 + (i % 6))}:${pad((i * 11) % 60)}` : "—",
    isPreorder: i % 11 === 0,
  };
});
