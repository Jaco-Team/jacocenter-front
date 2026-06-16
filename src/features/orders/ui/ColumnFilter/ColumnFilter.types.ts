export type ColumnFilterProps = {
  id: string;
  options: Record<string, boolean>;
  onChange: (rows: Record<string, boolean>) => void;
  allLabel?: string;
  onToggle?: (open: boolean) => void;
}