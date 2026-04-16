import { Column } from "@/shared/ui/Table/Table.types"
import { Client } from "./TableClients.types"
import Image from "next/image";

export const getClientsColumns = (
  onHistoryClick: (row: Client) => void,
  onPromoClick: (row: Client) => void
): Column<Client>[] => [
  { key: 'name', title: 'Имя', width: 168 },
  { key: 'phone', title: 'Телефон', width: 168 },
  { key: 'address', title: 'Адрес', width: 456 },
  { 
    key: 'promo', 
    title: 'Промокоды', 
    width: 128, 
    render: () => (<Image src="/icons/info-base.svg" alt="Посмотреть промокоды" width={20} height={20}/>), 
    onCellClick: onPromoClick,
  },
  { 
    key: 'history', 
    title: 'История заказов', 
    width: 168, 
    render: () => (<Image src="/icons/script.svg" alt="Открыть историю заказов" width={20} height={20}/>), 
    onCellClick: onHistoryClick
  },
];