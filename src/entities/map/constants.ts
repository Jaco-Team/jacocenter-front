import type { IDeliveryZone } from '@/widgets/Map/ui/MapWidget.types';

export const DELIVERY_ZONES: IDeliveryZone[] = [
  {
    id: 'green',
    title: 'Зелёная зона',
    color: '#22c55e',
    coordinates: [
      [
        [37.57, 55.78],
        [37.66, 55.78],
        [37.66, 55.72],
        [37.57, 55.72],
        [37.57, 55.78],
      ],
    ],
  },
  {
    id: 'yellow',
    title: 'Жёлтая зона',
    color: '#eab308',
    coordinates: [
      [
        [37.50, 55.82],
        [37.74, 55.82],
        [37.74, 55.68],
        [37.50, 55.68],
        [37.50, 55.82],
      ],
    ],
  },
  {
    id: 'red',
    title: 'Красная зона',
    color: '#ef4444',
    coordinates: [
      [
        [37.40, 55.86],
        [37.84, 55.86],
        [37.84, 55.62],
        [37.40, 55.62],
        [37.40, 55.86],
      ],
    ],
  },
];