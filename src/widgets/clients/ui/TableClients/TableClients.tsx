'use client';
import { Table } from "@/shared/ui/Table/Table";
import { Client } from "./TableClients.types";
import { clients } from "../../utils/constants";
import { useSearchFormStore } from "@/entities/client/store/searchForm/searchForm";
import { useState } from "react";
import { OrdersHistory } from "../OrdersHistory/OrdersHistory";
import { orderHistoryMock } from "../../data/mocks";
import { getClientsColumns } from "./TableClients.columns";

export const TableClients = () => {
  const [selectedClientHistory, setSelectedClientHistory] = useState<Client | null>(null);
  const { foundClientId } = useSearchFormStore();
  const foundRow = foundClientId !== null ? clients.findIndex(c => c.id === foundClientId) : null;
  const columns = getClientsColumns(setSelectedClientHistory);

  return (
    <>
      <Table 
        data={clients} 
        columns={columns}
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