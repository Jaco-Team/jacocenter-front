export type ModalFiltersProps = {
  visibleColumns: Record<string, boolean>
  onApply: (columns: Record<string, boolean>) => void
}