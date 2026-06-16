import { Button } from "@/shared/ui/Button/Button";
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox";
import { Text } from "@/shared/ui/Typography/Typography";
import { ModalFiltersProps } from "./ModalFilters.types";
import "./ModalFilters.style.css";

export const ModalFilters = ({ visibleColumns, onChange, onToggle }: ModalFiltersProps) => {
  const columns = Object.keys(visibleColumns);
  const allChecked = columns.every((name) => visibleColumns[name]);

  const handleAll = (value: boolean) => {
    onChange(Object.fromEntries(columns.map((name) => [name, value])));
  };

  const handleOne = (name: string, value: boolean) => {
    onChange({ ...visibleColumns, [name]: value });
  };

  const handleReset = () => {
    onChange(Object.fromEntries(columns.map((name) => [name, false]))); 
  }

  return (
    <div 
      id="filters-modal" 
      popover="auto" 
      className="filter-container" 
      onToggle={(e) => onToggle?.((e).newState === 'open')}
    >
      <Text variant="body-m-medium-16">Фильтры</Text>
      <div className="filters-all">
        <Checkbox text="Все параметры таблицы" checked={allChecked} onChange={handleAll} className="checkbox-accent"/>
      </div>

      <ul className="filters-list">
        {columns.map((name) => (
          <li key={name} className="filters-item">
            <Checkbox text={name} checked={visibleColumns[name]} onChange={(v) => handleOne(name, v)}/>
          </li>)
        )}
      </ul>

      <Button variant="base" theme="secondary" className="reset-button" onClick={handleReset}>
        <Text>Сбросить</Text>
      </Button>
    </div>
  )
}