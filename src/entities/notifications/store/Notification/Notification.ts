import { create } from 'zustand';

import type { NotificationVariant } from '@/entities/notifications/model/types';

export interface NotificationAlert {
  id: string;
  zoneName: string;
  variant: NotificationVariant;
}

interface NotificationStore {
  alerts: NotificationAlert[];
  addAlert: (alert: NotificationAlert) => void;
  removeAlert: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  alerts: [],

  addAlert: (alert) =>
    set((state) => ({
      alerts: [...state.alerts, alert],
    })),

  removeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    })),
}));
