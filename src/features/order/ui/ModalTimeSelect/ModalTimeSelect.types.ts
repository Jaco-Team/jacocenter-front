export type ModalTimeSelectProps = {
  isOpen: boolean; 
  onClose:() => void; 
  onTimeSelect: (val: string) => void;
}