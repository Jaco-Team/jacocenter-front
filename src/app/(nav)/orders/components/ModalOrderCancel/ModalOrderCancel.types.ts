export type ModalOrderCancelProps = {
  isOpen: boolean; 
  onClose: ()=> void; 
  onCancel: ()=> void; 
  orderNumber?: number
}