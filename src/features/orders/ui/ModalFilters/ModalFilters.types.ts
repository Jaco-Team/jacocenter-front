export type ModalFiltersProps = {
  visibleColumns: Record<string, boolean>
  onChange: (columns: Record<string, boolean>) => void
  onToggle: (open: boolean) => void
}