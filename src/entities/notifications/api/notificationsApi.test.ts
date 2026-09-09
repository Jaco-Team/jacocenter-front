import { afterEach, describe, expect, it, vi } from 'vitest';
import { notificationsApi } from './notificationsApi';
import { API_BASE_URL } from '@/shared/config/api';

describe('notificationsApi', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('maps durable notifications and serializes incremental polling filters', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      st: true,
      data: {
        items: [{ id: '9', type: 'cafe.stopped', data: { point_id: 4 }, read: false, created_at: '2026-09-09T10:00:00Z' }],
        next_after_id: '9',
      },
    }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(notificationsApi.list({ afterId: 8, unread: true, limit: 25 })).resolves.toEqual({
      items: [{ id: 9, type: 'cafe.stopped', data: { point_id: 4 }, read: false, createdAt: '2026-09-09T10:00:00Z' }],
      nextAfterId: 9,
    });
    expect(fetchMock.mock.calls[0][0]).toContain('/notifications?after_id=8&unread=1&limit=25');
  });

  it('uses the dedicated read actions', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ st: true, data: {} }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ st: true, data: {} }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    await notificationsApi.markRead(9);
    await notificationsApi.markAllRead();

    expect(fetchMock.mock.calls.map(([url, init]) => [url, init.method])).toEqual([
      [`${API_BASE_URL}/notifications/9/read`, 'POST'],
      [`${API_BASE_URL}/notifications/read-all`, 'POST'],
    ]);
  });
});
