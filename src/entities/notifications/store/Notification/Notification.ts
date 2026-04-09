import { create } from 'zustand';

export interface NotificationAlert {
  id: string;
  zoneName: string;
  variant: 'cafe-stopped' | 'cafe-available';
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
