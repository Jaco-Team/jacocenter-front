'use client';
import { Table } from "@/shared/ui/Table/Table";
import { Column } from "@/shared/ui/Table/Table.types";
import { Client } from "./TableClients.types";
import Image from "next/image";
import { clients } from "../../utils/constants";
import { useSearchFormStore } from "@/entities/client/store/searchForm/searchForm";
import { useState } from "react";
import { OrdersHistory } from "../OrdersHistory/OrdersHistory";
import { orderHistoryMock } from "../../data/mocks";

export const TableClients = () => {
  const [selectedClientHistory, setSelectedClientHistory] = useState<Client | null>(null);
  const { foundClientId } = useSearchFormStore();
  const foundRow = foundClientId !== null ? clients.findIndex(c => c.id === foundClientId) : null;

  const columns: Column<Client>[] = [
    { key: 'name', title: 'Имя', width: 168 },
    { key: 'phone', title: 'Телефон', width: 168 },
    { key: 'address', title: 'Адрес', width: 456 },
    { 
      key: 'promo', 
      title: 'Промокоды', 
      width: 128, 
      render: () => (<Image src="/icons/info-base.svg" alt="Посмотреть промокоды" width={20} height={20}/>), 
      onCellClick: (row) => console.log(row)
    },
    { 
      key: 'history', 
      title: 'История заказов', 
      width: 168, 
      render: () => (<Image src="/icons/script.svg" alt="Открыть историю заказов" width={20} height={20}/>), 
      onCellClick: (row) => setSelectedClientHistory(row)
    },
  ];

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
      <OrdersHistory
        isOpen={!!selectedClientHistory}
        onClose={() => setSelectedClientHistory(null)}
        orders={orderHistoryMock}
      />      
    </>
  );
}