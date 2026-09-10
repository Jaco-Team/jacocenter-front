export type NotificationConfig = {
  variant: NotificationVariant;
  text: string;
}

export type NotificationProps = {
  id: string;
  zoneName:string; 
}
import type { NotificationVariant } from '@/entities/notifications/model/types';

export type { NotificationVariant } from '@/entities/notifications/model/types';
