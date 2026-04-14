import { Button } from "@/shared/ui/Button/Button";
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox";
import { Text } from "@/shared/ui/Typography/Typography";
import { ColumnFilterProps } from "./ColumnFilter.types";
import "./ColumnFilter.style.css";

export const ColumnFilter = ({ id, options, onChange, allLabel="Все", onToggle }: ColumnFilterProps) => {
  const rows = Object.keys(options);
  const allChecked = rows.every((name) => options[name]);

  const handleAll = (value: boolean) => {
    onChange(Object.fromEntries(rows.map((name) => [name, value])));
  };

  const handleOne = (name: string, value: boolean) => {
    onChange({ ...options, [name]: value });
  };

  const handleReset = () => {
    onChange(Object.fromEntries(rows.map((name) => [name, false])));
  };

  return (
    <div 
      id={id} 
      popover="auto" 
      className="column-filter-container" 
      style={{ positionAnchor: `--${id}` }}
      onToggle={(e) => onToggle?.((e).newState === "open")}
    >
      <div className="column-filter-all">
        <Checkbox 
          text={allLabel} 
          checked={allChecked} 
          onChange={handleAll} 
          className={allChecked ? "checkbox-accent" : ""}
        />
      </div>

      <ul className="column-filter-list">
        {rows.map((name) => (
          <li key={name} className="column-filter-item">
            <Checkbox 
              text={name} 
              checked={options[name]} 
              onChange={(v) => handleOne(name, v)}
            />
          </li>)
        )}
      </ul>

      <Button variant="base" theme="secondary" className="column-filter-reset-button" onClick={handleReset}>
        <Text variant="body-m-medium-16">Сбросить</Text>
      </Button>
    </div>
  )
}