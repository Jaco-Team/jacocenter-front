import { apiRequest } from '@/shared/api/http';
import { queryString } from '@/shared/api/query';
import { mapNotificationPage } from './notificationMapper';
import type { NotificationPageDto } from './notificationMapper';
import type { NotificationPage } from '../model/types';

export const notificationsApi = {
  async list(options: { afterId?: number; unread?: boolean; limit?: number } = {}): Promise<NotificationPage> {
    const response = await apiRequest<{ data: NotificationPageDto }>(`/notifications${queryString({ after_id: options.afterId, unread: options.unread ? 1 : undefined, limit: options.limit })}`);
    return mapNotificationPage(response.data);
  },

  async markRead(notificationId: number): Promise<void> {
    await apiRequest(`/notifications/${notificationId}/read`, { method: 'POST' });
  },

  async markAllRead(): Promise<void> {
    await apiRequest('/notifications/read-all', { method: 'POST' });
  },
};
