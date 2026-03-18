export type NotificationConfig = {
  variant: "cafe-available" | "cafe-stopped";
  text: string;
}

export type NotificationProps = {
  zoneName:string; 
  isOpen: boolean; 
  onClose:()=>void
}