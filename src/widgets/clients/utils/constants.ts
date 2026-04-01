import { Client } from "../ui/TableClients/TableClients.types";

export const clients: Client[] = Array.from({ length: 99 }, (_, i) => ({
  id: i,
  name: `Иванов Иван Иванович ${i + 1}`,
  phone: `+7 999 000 00-${String(i + 1).padStart(2, '0')}`,
  address: `Москва, ул. Ленина, д. 1, подъезд 1, кв. ${i + 1}`,
}));