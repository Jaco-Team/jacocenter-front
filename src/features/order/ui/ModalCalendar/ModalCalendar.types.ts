export type ModalCalendarProps = {
  isOpen: boolean; 
  onClose: () => void; 
  onSelect: (date: string) => void;
}