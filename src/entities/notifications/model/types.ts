export type NotificationVariant = 'cafe.stopped' | 'cafe.available';

export type Notification = {
  id: number;
  type: string;
  data: Record<string, unknown>;
  read: boolean;
  createdAt: string;
};

export type NotificationPage = {
  items: Notification[];
  nextAfterId: number | null;
};
