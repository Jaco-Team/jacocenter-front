export type NotificationConfig = {
  variant: "cafe-available" | "cafe-stopped";
  text: string;
}

export type NotificationProps = {
  id: string;
  zoneName:string; 
}