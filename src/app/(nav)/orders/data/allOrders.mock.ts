import { Order } from "../components/TableOrders/TableOrders.types";

export const cafeList = [
  "Ленинградская 47",
  "Ворошилова 12А",
  "Матросова 32",
  "Цветной 1"
];

export const mockAllOrders: Order[] = Array.from({ length: 200 }, (_, i) => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    orderNumber: 800000 + i,
    status: (['inQueue', 'cooking', 'inDelivery', 'ready', 'cancel'] as const)[i % 5],
    type: (['room', 'delivery', 'takeaway'] as const)[i % 3],
    createdBy: (['Клиент', 'Кухня'] as const)[i % 2],
    client: `Иванов Иван Иванович ${i}`,
    phone: `+7 999 000 00-${pad(i)}`,
    address: `ул. Ленина, д. 1, под. 1, кв. ${i}`,
    openedAt: `${pad(i % 24)}:${pad((i * 7) % 60)}:00`,
    dueTime: `${pad(i % 24)}:00-${pad((i + 1) % 24)}:00`,
    closedAtKitchen: `${pad(i % 24)}:${pad((i * 7 + 25) % 60)}:00`,
    receivedAt: `${pad((i + 1) % 24)}:${pad((i * 11) % 60)}:00`,
    timeToOverdue: `00:${pad((i * 5) % 60)}:00`,
    promisedAt: `${pad((i + 2) % 24)}:00:00`,
    amount: 500 + (i % 40)* 150,
    payment: ['б/н', 'нал'][i % 2],
    driver: 'Тимофеев М.Ф.',
    cafe: cafeList[i % cafeList.length],
  }
});
