import { Order } from "../components/TableOrders/TableOrders.types";

export const mockAllOrders: Order[] = Array.from({ length: 200 }, (_, i) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  const statuses = ["inQueue", "cooking", "inDelivery", "ready", "cancel", "completed"] as const;
  const types = ["room", "delivery", "takeaway", "toGo"] as const;
  const minutesLeft = (i * 5) % 45;

  return {
    id: 800000 + i,
    pointId: (i % 4) + 1,
    orderNumber: 800000 + i,
    status: statuses[i % statuses.length],
    type: types[i % types.length],
    createdBy: (["Клиент", "Кухня"] as const)[i % 2],
    phone: `+7 999 000 00-${pad(i % 100)}`,
    address: `ул. Ленина, д. 1, под. 1, кв. ${i}`,
    openedAt: `${pad(10 + (i % 10))}:${pad((i * 7) % 60)}`,
    dueTime: `${pad(i % 24)}:00-${pad((i + 1) % 24)}:00`,
    closedAtKitchen: `${pad(i % 24)}:${pad((i * 7 + 25) % 60)}`,
    receivedAt: statuses[i % statuses.length] === "completed" ? `${pad(11 + (i % 8))}:${pad((i * 11) % 60)}` : "—",
    timeToOverdue: `00:${pad(minutesLeft)}:00`,
    promisedAt: `${pad(11 + (i % 8))}:${pad((i * 3) % 60)}`,
    amount: 500 + (i % 40) * 150,
    payment: ["б/н", "нал"][i % 2],
    driver: "Тимофеев М.Ф.",
    isPreorder: i % 11 === 0,
  };
});
