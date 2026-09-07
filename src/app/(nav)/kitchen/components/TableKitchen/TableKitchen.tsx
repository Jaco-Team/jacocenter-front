"use client";

import { Table } from "@/shared/ui/Table/Table";
import { useMemo, useState } from "react";
import { getKitchenColumns } from "./TableKitchen.columns";
import { orderStatus, STATUS_TABS } from "@/widgets/orders/utils/constants";
import { useKitchenStore } from "@/entities/Order/store/kitchen/kitchenStore";
import { ColumnFilter } from "@/features/orders/ui/ColumnFilter/ColumnFilter";
import { mockKitchenOrders } from "../../data/kitchenOrders.mock";
import { KitchenOrder } from "./TableKitchen.types";

export const TableKitchen = () => {
  const {
    foundOrderNumber,
    statusFilter,
    typeFilter,
    setStatusFilter,
    setTypeFilter,
    visibleColumns,
    selectedCafe,
    statusTab,
    typeTab,
    sortKey,
    sortDir,
    toggleSort,
    refreshKey,
  } = useKitchenStore();

  const [activeColumn, setActiveColumn] = useState<"status" | "type" | null>(null);

  const columns = getKitchenColumns(activeColumn, sortKey, sortDir, toggleSort).filter(
    (col) => visibleColumns[col.title],
  );

  const filteredOrders = useMemo(() => {
    const statusTabConfig = STATUS_TABS.find((tab) => tab.id === statusTab);

    let list = mockKitchenOrders.filter((order) => {
      const matchesCafe = !selectedCafe || order.cafe === selectedCafe;
      const matchesStatusFilter = statusFilter[orderStatus[order.status]?.label];
      const matchesTypeFilter = typeFilter[orderStatus[order.type]?.label];

      let matchesStatusTab = true;
      if (statusTab === "preorder") {
        matchesStatusTab = Boolean(order.isPreorder) && order.status !== "cancel";
      } else if (statusTabConfig) {
        matchesStatusTab =
          statusTabConfig.statuses.includes(order.status) &&
          (statusTab === "active" ? !order.isPreorder : true);
      }

      const matchesTypeTab = typeTab === "all" || order.type === typeTab;

      return (
        matchesCafe &&
        matchesStatusFilter &&
        matchesTypeFilter &&
        matchesStatusTab &&
        matchesTypeTab
      );
    });

    if (sortKey && sortDir) {
      list = [...list].sort((a, b) => {
        const left = String(a[sortKey as keyof KitchenOrder] ?? "");
        const right = String(b[sortKey as keyof KitchenOrder] ?? "");
        const cmp = left.localeCompare(right, "ru", { numeric: true });
        return sortDir === "asc" ? cmp : -cmp;
      });
    }

    return list;
  }, [
    selectedCafe,
    statusFilter,
    typeFilter,
    statusTab,
    typeTab,
    sortKey,
    sortDir,
    refreshKey,
  ]);

  const foundRow =
    foundOrderNumber === null
      ? null
      : filteredOrders.findIndex((order) => order.number === foundOrderNumber);

  return (
    <>
      <Table
        data={filteredOrders}
        columns={columns}
        height={564}
        rowHeight={52}
        rowGap={4}
        headerHeight={60}
        fontVariant="label-s-regular-12"
        foundRow={foundRow === -1 ? null : foundRow}
      />
      <ColumnFilter
        options={statusFilter}
        onChange={setStatusFilter}
        allLabel="Все статусы"
        id="status-filters"
        onToggle={(open) => setActiveColumn(open ? "status" : null)}
      />
      <ColumnFilter
        options={typeFilter}
        onChange={setTypeFilter}
        allLabel="Все типы"
        id="type-filters"
        onToggle={(open) => setActiveColumn(open ? "type" : null)}
      />
    </>
  );
};
