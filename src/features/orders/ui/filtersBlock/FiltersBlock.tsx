"use client";
import Image from "next/image";
import { useState } from "react";
import "./FiltersBlock.style.css";
import { CafeFilterTab } from "../CafeFilterTab/CafeFilterTab";
import { FiltersBlockProps } from "./FiltersBlock.types";

export const FiltersBlock = ({ cafeList }: FiltersBlockProps) => {
  const [selectedCafe, setSelectedCafe] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const handleRefresh = () => console.log("Обновить список");

  const handleOpenSettings = () => setIsSettingsOpen(prev => !prev);

  return (
    <div className="filters-block-container">
      <ul className="cafe-filters-list">
        {cafeList.map((cafe) => (
          <li key={cafe} >
            <CafeFilterTab 
              cafe={cafe} 
              isActive={selectedCafe === cafe}
              onSelect={() => setSelectedCafe(cafe)}/>
          </li>
        ))}
      </ul>
      <div className="filters-buttons-group">
        <button type="button" className="filters-button filters-button-refresh" onClick={handleRefresh}>
          <Image src="/icons/download.svg" alt="Обновить" height={20} width={20}/>
        </button>
        <button type="button" className={`filters-button ${isSettingsOpen ? "filters-button-settings" : ""}`} onClick={handleOpenSettings}>
          <Image src="/icons/settings.svg" alt="Открыть настройки" height={20} width={20}/>
        </button>
      </div>
    </div>
  )
}