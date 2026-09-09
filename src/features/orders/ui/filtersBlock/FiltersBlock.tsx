"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./FiltersBlock.style.css";
import { FiltersBlockProps } from "./FiltersBlock.types";
import { ModalFilters } from "../ModalFilters/ModalFilters";
import { useOrdersStore } from "@/entities/Order/store/orders/ordersStore";
import { Text } from "@/shared/ui/Typography/Typography";
import {
  STATUS_TABS,
  TYPE_TABS,
  StatusTabId,
  TypeTabId,
} from "@/widgets/orders/utils/constants";
import { CafeFilterTab } from "../CafeFilterTab/CafeFilterTab";

const REFRESH_SECONDS = 60;

export const FiltersBlock = ({ points, orders }: FiltersBlockProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(REFRESH_SECONDS);
  const secondsLeftRef = useRef(REFRESH_SECONDS);

  const {
    visibleColumns,
    setVisibleColumns,
    selectedPointId,
    setSelectedPointId,
    statusTab,
    typeTab,
    setStatusTab,
    setTypeTab,
    triggerRefresh,
  } = useOrdersStore();

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

    return orders.filter((order) => {
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
                <Text variant="body-m-regular-16">
                  {tab.label} {getStatusCount(tab.id)}
                </Text>
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
                {tab.icon && (
                  <Image src={tab.icon} alt="" width={18} height={18} />
                )}
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
          {points.map((point) => (
            <li key={point.id}>
              <CafeFilterTab
                cafe={point.address}
                isActive={selectedPointId === point.id}
                onSelect={() => setSelectedPointId(point.id)}
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
