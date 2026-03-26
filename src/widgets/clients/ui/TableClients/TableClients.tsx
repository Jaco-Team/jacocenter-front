import { Table } from "@/shared/ui/Table/Table";
import { Column } from "@/shared/ui/Table/Table.types";
import { Client, TableClientsProps } from "./TableClients.types";
import Image from "next/image";
import { useState } from "react";
import { PromocodeList } from "../PromocodeList/PromocodeList";

const clients: Client[] = Array.from({ length: 99 }, (_, i) => ({
  name: `Иванов Иван Иванович ${i + 1}`,
  phone: `+7 999 000 00-${String(i + 1).padStart(2, '0')}`,
  address: `Москва, ул. Ленина, д. 1, подъезд 1, кв. ${i + 1}`,
}));

export const TableClients = ({ searchPhone }: TableClientsProps) => {
  const [selectedClientPromo, setSelectedClientPromo] = useState<Client | null>(null);

  const columns: Column<Client>[] = [
    { key: 'name', title: 'Имя', width: 168 },
    { key: 'phone', title: 'Телефон', width: 168 },
    { key: 'address', title: 'Адрес', width: 328 },
    { 
      key: 'promo', 
      title: 'Промокоды', 
      width: 128, 
      render: () => (<Image src="/icons/info-base.svg" alt="Посмотреть промокоды" width={20} height={20}/>), 
      onCellClick: (row) => setSelectedClientPromo(row)},
    { 
      key: 'history', 
      title: 'История заказов', 
      width: 168, 
      render: () => (<Image src="/icons/script.svg" alt="Открыть историю заказов" width={20} height={20}/>), 
      onCellClick: (row) => console.log(row)},
    {
      key: 'edit', 
      title: 'Редакт', 
      width: 128, 
      render: () => (<Image src="/icons/edit.svg" alt="Редактировать клиента" width={20} height={20}/>), 
      onCellClick: (row) => console.log(row)
    },
  ];

  const foundRow = searchPhone ? clients.findIndex(client => client.phone === searchPhone) : null;

  return (
    <>
      <Table 
        data={clients} 
        columns={columns}
        width={1088}
        height={592}
        rowHeight={56}
        rowGap={8}
        foundRow={foundRow === -1 ? null : foundRow}
      />
      <PromocodeList isOpen={!!selectedClientPromo} onClose={() => setSelectedClientPromo(null)}/>
    </>
  );
}