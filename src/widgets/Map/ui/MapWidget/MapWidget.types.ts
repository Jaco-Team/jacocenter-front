import { CSSProperties } from 'react';
import type { LngLat } from 'ymaps3';

export type PolygonCoords = number[][][];

export interface IDeliveryZone {
  id: string;
  name: string;
  coordinates: PolygonCoords;
  status: 'active' | 'stopped';
}

export interface IMapWidgetProps {
  apiKey: string;
  height?: CSSProperties['height'];
  width?: CSSProperties['width'];
  className?: string;
  defaultCenter?: LngLat;
  defaultZoom?: number;
  placeholder?: string;
  onZoneDetect?: (zone: IDeliveryZone | null) => void;
}

export type AddressCheckStatus = 'idle'| 'success' | 'error';