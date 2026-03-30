import { Button } from "@/shared/ui/Button/Button";
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox";
import { Text } from "@/shared/ui/Typography/Typography";
import { useState } from "react";
import { ModalFiltersProps } from "./ModalFilters.types";
import "./ModalFilters.style.css";

export const ModalFilters = ({ visibleColumns, onApply }: ModalFiltersProps) => {
  const [checked, setChecked] = useState<Record<string, boolean>>(visibleColumns);
  const columns = Object.keys(visibleColumns);

  const allChecked = columns.every((name) => checked[name]);

  const handleAll = (value: boolean) => {
    setChecked(Object.fromEntries(columns.map((name) => [name, value])));
  };

  const handleOne = (name: string, value: boolean) => {
    setChecked((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApply(checked)
    document.getElementById("filters-modal")?.hidePopover()
  }

  const handleReset = () => {
    setChecked(visibleColumns); 
    document.getElementById("filters-modal")?.hidePopover()
  }

  return (
    <div  id="filters-modal" popover="manual" className="filter-container">
      <Text variant="body-m-medium-16">Фильтры</Text>
      <div className="filters-all">
        <Checkbox text="Все параметры таблицы" checked={allChecked} onChange={handleAll} className="checkbox-accent"/>
      </div>

      <ul className="filters-list">
        {columns.map((name) => (
          <li key={name} className="filters-item">
            <Checkbox text={name} checked={checked[name]} onChange={(v) => handleOne(name, v)}/>
          </li>)
        )}
      </ul>

      <div className="filters-btns-group">
        <Button variant="base" theme="secondary" className="reset-button" onClick={handleReset}>
          <Text variant="body-m-medium-16">Сбросить</Text>
        </Button>
        <Button variant="base" theme="primary" className="apply-button" onClick={handleApply}>
          <Text variant="body-m-medium-16">Применить</Text>
        </Button>
      </div>
    </div>
  )
}