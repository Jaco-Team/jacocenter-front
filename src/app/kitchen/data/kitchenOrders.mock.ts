import { KitchenOrder } from "../components/TableKitchen/TableKitchen.types";

export const mockKitchenOrders: KitchenOrder[] = Array.from({ length: 200 }, (_, i) => ({
  number: i + 800000,
  status: (['inQueue', 'cooking', 'ready', 'cancel'] as const)[i % 4],
  type: (['room', 'delivery', 'takeaway'] as const)[i % 3],
  orderedAt: `${10 + (i % 8)}:${String(i * 3 % 60).padStart(2, '0')}:${String(i * 7 % 60).padStart(2, '0')}`,
  readyAt: `${11 + (i % 8)}:${String(i * 5 % 60).padStart(2, '0')}:${String(i * 11 % 60).padStart(2, '0')}`,
  assembledAt: `${11 + (i % 8)}:${String((i * 5 + 5) % 60).padStart(2, '0')}:${String(i * 13 % 60).padStart(2, '0')}`,
  closedAt: i % 6 === 0 ? undefined : `${12 + (i % 6)}:${String(i * 4 % 60).padStart(2, '0')}:${String(i * 9 % 60).padStart(2, '0')}`,
  preparedAt: `${11 + (i % 7)}:${String(i * 6 % 60).padStart(2, '0')}:${String(i * 17 % 60).padStart(2, '0')}`,
  servedAt: i % 5 === 0 ? undefined : `${12 + (i % 6)}:${String((i * 4 + 10) % 60).padStart(2, '0')}:${String(i * 19 % 60).padStart(2, '0')}`,
  promisedIn: (['15-30', '30-60', '60-90'] as const)[i % 3],
}));

export const cityOptions = ['Тольятти', 'Самара'];
export const cafeOptions = ['Ленинградская 47', 'Ворошилова 12 а', 'Матросова 32', 'Цветной 1'];  