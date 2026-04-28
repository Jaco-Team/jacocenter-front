import type { LngLat } from 'ymaps3';

export type PolygonCoords = number[][][];
// export type PolygonCoords = [number, number];

export interface IDeliveryZone {
  id: string;
  title: string;
  color: string;
  coordinates: PolygonCoords;
}

export interface IMapWidgetProps {
  apiKey: string;
  className?: string;
  defaultCenter?: LngLat;
  defaultZoom?: number;
  placeholder?: string;
  onZoneDetect?: (zone: IDeliveryZone | null) => void;
}