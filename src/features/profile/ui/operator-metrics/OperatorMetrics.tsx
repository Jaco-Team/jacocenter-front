'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { operatorMetricsApi } from '@/entities/auth/api/operatorMetricsApi';
import type { OperatorMetrics as OperatorMetricsModel } from '@/entities/auth/model/operator-metrics';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Text, Title } from '@/shared/ui/Typography/Typography';
import './OperatorMetrics.styles.css';

type Period = { dateFrom: string; dateTo: string };

function localDate(value: Date): string {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function defaultMetricsPeriod(now = new Date()): Period {
  return {
    dateFrom: localDate(new Date(now.getFullYear(), now.getMonth(), 1)),
    dateTo: localDate(now),
  };
}

const currency = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

function MetricCard({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  return (
    <div className="operator-metrics__card">
      <span className="operator-metrics__icon">
        <Image src={icon} alt="" width={24} height={24} />
      </span>
      <div>
        <Text variant="label-s-regular-12" className="operator-metrics__label">{label}</Text>
        <Text variant="body-l-medium-20" className="operator-metrics__value">{value}</Text>
      </div>
    </div>
  );
}

export function MetricsContent({ metrics }: { metrics: OperatorMetricsModel }) {
  const pointNames = metrics.points.map((point) => point.name).filter(Boolean).join(', ');

  return (
    <>
      <Text variant="label-s-regular-12" className="operator-metrics__points">
        Точки: {pointNames || 'нет доступных точек'}
      </Text>

      <div className="operator-metrics__cards">
        <MetricCard icon="/icons/orders.svg" label="Оформлено заказов" value={metrics.orders.ordersCount} />
        <MetricCard icon="/icons/script.svg" label="Выручка" value={currency.format(metrics.orders.revenue)} />
        <MetricCard icon="/icons/script.svg" label="Средний чек" value={currency.format(metrics.orders.averageCheck)} />
        <MetricCard icon="/icons/order-delivery.svg" label="Доставки" value={metrics.orders.deliveryCount} />
        <MetricCard icon="/icons/order-pickup.svg" label="Самовывоз" value={metrics.orders.pickupCount} />
        <MetricCard icon="/icons/calendar.svg" label="Предзаказы" value={metrics.orders.preorderCount} />
        <MetricCard icon="/icons/checkmark-success.svg" label="С промокодом" value={metrics.orders.withPromoCount} />
        <MetricCard icon="/icons/warning-triangle.svg" label="Ошибки" value={metrics.errors.rowsCount} />
        <MetricCard icon="/icons/info-error.svg" label="Сумма удержаний" value={currency.format(metrics.errors.penaltySum)} />
        <MetricCard icon="/icons/repeat.svg" label="Опоздания" value={`${metrics.overtime.latePercent}%`} />
      </div>

      <div className="operator-metrics__details">
        <section className="operator-metrics__detail-card">
          <Title>Своевременность заказов</Title>
          <div className="operator-metrics__detail-grid">
            <Text>Без опоздания: <strong>{metrics.overtime.allGreen}</strong></Text>
            <Text>С опозданием: <strong>{metrics.overtime.allRed}</strong></Text>
            <Text>Кухня вовремя: <strong>{metrics.overtime.cookOnTime}</strong></Text>
            <Text>Кухня поздно: <strong>{metrics.overtime.cookLate}</strong></Text>
            <Text>Доставка вовремя: <strong>{metrics.overtime.deliveryOnTime}</strong></Text>
            <Text>Доставка поздно: <strong>{metrics.overtime.deliveryLate}</strong></Text>
          </div>
        </section>

        <section className="operator-metrics__detail-card">
          <Title>Созданные промокоды</Title>
          {metrics.promos.items.length === 0 ? (
            <Text className="operator-metrics__empty">За выбранный период промокодов нет</Text>
          ) : (
            <ul className="operator-metrics__promo-list">
              {metrics.promos.items.map((promo) => (
                <li key={promo.id}>
                  <span>
                    <Text className={promo.deleted ? 'operator-metrics__promo-deleted' : ''}>{promo.name}</Text>
                    <Text variant="label-s-regular-12" className="operator-metrics__label">
                      {new Date(`${promo.createdAt.slice(0, 10)}T00:00:00`).toLocaleDateString('ru-RU')}
                    </Text>
                  </span>
                  <Text>{promo.count} шт.</Text>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}

export function OperatorMetrics() {
  const initialPeriod = defaultMetricsPeriod();
  const [draft, setDraft] = useState<Period>(initialPeriod);
  const [period, setPeriod] = useState<Period>(initialPeriod);
  const [periodError, setPeriodError] = useState('');
  const metrics = useQuery({
    queryKey: ['operator-metrics', period.dateFrom, period.dateTo],
    queryFn: () => operatorMetricsApi.get(period),
    retry: 1,
  });

  const applyPeriod = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (draft.dateFrom > draft.dateTo) {
      setPeriodError('Дата начала не может быть позже даты окончания');
      return;
    }
    setPeriodError('');
    setPeriod(draft);
  };

  return (
    <section className="operator-metrics">
      <header className="operator-metrics__header">
        <div>
          <Title Tag="h2" variant="body-l-medium-20">Показатели сотрудника</Title>
          <Text className="operator-metrics__subtitle">Статистика суммируется по доступным точкам</Text>
        </div>
        <form className="operator-metrics__period" onSubmit={applyPeriod}>
          <Input
            type="date"
            label="С"
            value={draft.dateFrom}
            onChange={(event) => setDraft((current) => ({ ...current, dateFrom: event.target.value }))}
            required
          />
          <Input
            type="date"
            label="По"
            value={draft.dateTo}
            onChange={(event) => setDraft((current) => ({ ...current, dateTo: event.target.value }))}
            required
          />
          <Button type="submit" variant="base" theme="primary" size="md" disabled={metrics.isFetching}>
            {metrics.isFetching ? 'Загрузка…' : 'Показать'}
          </Button>
        </form>
      </header>

      {periodError ? <Text className="operator-metrics__error" role="alert">{periodError}</Text> : null}
      {metrics.isLoading ? <Text className="operator-metrics__state">Загружаем показатели…</Text> : null}
      {metrics.isError ? (
        <div className="operator-metrics__state" role="alert">
          <Text>{metrics.error instanceof Error ? metrics.error.message : 'Не удалось загрузить показатели'}</Text>
          <Button variant="base" theme="secondary" size="md" onClick={() => void metrics.refetch()}>
            Повторить
          </Button>
        </div>
      ) : null}
      {metrics.data ? <MetricsContent metrics={metrics.data} /> : null}
    </section>
  );
}
