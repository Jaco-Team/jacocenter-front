"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "@/features/orders/ui/filtersBlock/FiltersBlock.style.css";
import { ModalFilters } from "@/features/orders/ui/ModalFilters/ModalFilters";
import { CafeFilterTab } from "@/features/orders/ui/CafeFilterTab/CafeFilterTab";
import { useKitchenStore } from "@/entities/Order/store/kitchen/kitchenStore";
import { Text } from "@/shared/ui/Typography/Typography";
import {
  STATUS_TABS,
  TYPE_TABS,
  StatusTabId,
  TypeTabId,
} from "@/widgets/orders/utils/constants";
import { cafeOptions, mockKitchenOrders } from "../../data/kitchenOrders.mock";

const REFRESH_SECONDS = 60;

export const KitchenFiltersBlock = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(REFRESH_SECONDS);
  const secondsLeftRef = useRef(REFRESH_SECONDS);

  const {
    visibleColumns,
    setVisibleColumns,
    selectedCafe,
    setSelectedCafe,
    statusTab,
    typeTab,
    setStatusTab,
    setTypeTab,
    triggerRefresh,
  } = useKitchenStore();

  useEffect(() => {
    const timer = setInterval(() => {
      const nextSeconds = secondsLeftRef.current <= 1
        ? REFRESH_SECONDS
        : secondsLeftRef.current - 1;

      secondsLeftRef.current = nextSeconds;
      setSecondsLeft(nextSeconds);

      if (nextSeconds === REFRESH_SECONDS) triggerRefresh();
    }, 1000);

    return () => clearInterval(timer);
  }, [triggerRefresh]);

  const handleRefresh = () => {
    secondsLeftRef.current = REFRESH_SECONDS;
    triggerRefresh();
    setSecondsLeft(REFRESH_SECONDS);
  };

  const getStatusCount = (tabId: StatusTabId) => {
    const tab = STATUS_TABS.find((item) => item.id === tabId);
    if (!tab) return 0;

    return mockKitchenOrders.filter((order) => {
      if (selectedCafe && order.cafe !== selectedCafe) return false;
      if (tabId === "preorder") return Boolean(order.isPreorder) && order.status !== "cancel";
      if (tabId === "active") return tab.statuses.includes(order.status) && !order.isPreorder;
      return tab.statuses.includes(order.status);
    }).length;
  };

  return (
    <div className="filters-block">
      <div className="filters-block__row">
        <ul className="filters-block__tabs">
          {STATUS_TABS.map((tab) => (
            <li key={tab.id}>
              <button
                type="button"
                className={`filters-tab ${statusTab === tab.id ? "filters-tab--active-dark" : ""}`}
                onClick={() => setStatusTab(tab.id)}
              >
                <Text variant="body-m-regular-16">{tab.label}</Text>
                <span className="filters-tab__count">{getStatusCount(tab.id)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="filters-block__row">
        <ul className="filters-block__tabs">
          {TYPE_TABS.map((tab) => (
            <li key={tab.id}>
              <button
                type="button"
                className={`filters-tab ${typeTab === tab.id ? "filters-tab--active-light" : ""}`}
                onClick={() => setTypeTab(tab.id as TypeTabId)}
              >
                {tab.icon && <Image src={tab.icon} alt="" width={18} height={18} />}
                <Text variant="body-m-regular-16">{tab.label}</Text>
              </button>
            </li>
          ))}
        </ul>

        <div className="filters-buttons-group">
          <button
            type="button"
            className="filters-button filters-button-refresh"
            onClick={handleRefresh}
            aria-label="Обновить список"
          >
            <Image src="/icons/repeat.svg" alt="" height={20} width={20} />
            <span className="filters-button-countdown">{secondsLeft}с</span>
          </button>
          <button
            type="button"
            popoverTarget="filters-modal"
            style={{ anchorName: "--filters-button" }}
            className={`filters-button ${isSettingsOpen ? "filters-button-settings" : ""}`}
            onClick={() => setIsSettingsOpen((prev) => !prev)}
          >
            <Image src="/icons/settings.svg" alt="Открыть настройки" height={20} width={20} />
          </button>
        </div>
      </div>

      <div className="filters-block__row">
        <ul className="cafe-filters-list">
          {cafeOptions.map((cafe) => (
            <li key={cafe}>
              <CafeFilterTab
                cafe={cafe}
                isActive={selectedCafe === cafe}
                onSelect={() => setSelectedCafe(cafe)}
              />
            </li>
          ))}
        </ul>
      </div>

      <ModalFilters
        visibleColumns={visibleColumns}
        onChange={setVisibleColumns}
        onToggle={setIsSettingsOpen}
      />
    </div>
  );
};
