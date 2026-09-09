import type { Notification, NotificationPage } from '../model/types';

export type NotificationDto = {
  id: number | string;
  type?: string;
  data?: unknown;
  read?: boolean;
  created_at?: string | null;
};

export type NotificationPageDto = {
  items?: NotificationDto[];
  next_after_id?: number | string | null;
};

export function mapNotification(value: NotificationDto): Notification {
  return {
    id: Number(value.id),
    type: String(value.type ?? ''),
    data: value.data && typeof value.data === 'object' && !Array.isArray(value.data)
      ? value.data as Record<string, unknown>
      : {},
    read: Boolean(value.read),
    createdAt: String(value.created_at ?? ''),
  };
}

export function mapNotificationPage(value: NotificationPageDto): NotificationPage {
  return {
    items: (value.items ?? []).map(mapNotification),
    nextAfterId: value.next_after_id == null ? null : Number(value.next_after_id),
  };
}
