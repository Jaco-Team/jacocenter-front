import { TypographyVariant } from "../Typography/Typography.types";

export interface CellProps<T> {
  data: T[];
  columns: Column<T>[];
  hoveredRow: number | null;
  setHoveredRow: (rowIndex: number | null) => void;
  pressedRow: number | null;
  setPressedRow: (rowIndex: number | null) => void;
  activeRow: number | null;
  setActiveRow: (rowIndex: number | null) => void;
  variant: 'default' | 'secondary';
  fontVariant: TypographyVariant;
  rowGap: number;
  onRowClick?: (row: T) => void;
}

export interface Column<T> {
  key: string;
  title: string;
  width: number;
  headerRender?: (column: Column<T>) => React.ReactNode;
  isHeaderActive?: boolean;
  render?: (value: string, row: T) => React.ReactNode;
  onHeaderClick?: (column: Column<T>) => void;
  onCellClick?: (row: T) => void;
  onRowClick?: (row: T) => void;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  height: number;
  width?: number | string;
  headerHeight?: number;
  rowHeight?: number;
  variant?: 'default' | 'secondary';
  fontVariant?: TypographyVariant;
  rowGap?: number;
  foundRow?: number | null;
  onRowClick?: (row: T) => void;
}