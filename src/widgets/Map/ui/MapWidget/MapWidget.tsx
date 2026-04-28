import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import './MapWidget.styles.css';

import type { LngLat } from '@yandex/ymaps3-types';
import { reactify } from '../../../../lib/ymaps3';
import * as turf from '@turf/turf';

import type {
  IDeliveryZone,
  IMapWidgetProps,
} from './MapWidget.types';

import { DELIVERY_ZONES } from '@/entities/map/constants';

declare global {
  interface Window {
    ymaps3: any;
  }
}

const DEFAULT_CENTER: LngLat = [37.617644, 55.755819];

export const MapWidget = ({
  apiKey,
  className = '',
  defaultCenter = DEFAULT_CENTER,
  defaultZoom = 10,
  placeholder = 'Введите адрес',
  onZoneDetect,
} : IMapWidgetProps) => {
  const [ready, setReady] = useState(false);
  const [search, setSearch] = useState('');
  const [center, setCenter] = useState<LngLat>(defaultCenter);
  const [zoom, setZoom] = useState(defaultZoom);
  const [marker, setMarker] = useState<LngLat | null>(null);
  const [status, setStatus] = useState('Введите адрес для проверки доставки');

  // Load Yandex Maps API once
  useEffect(() => {
    if (window.ymaps3) {
      window.ymaps3.ready.then(() => setReady(true));
      return;
    }

    const script = document.createElement('script');

    script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;
    script.async = true;

    script.onload = async () => {
      await window.ymaps3.ready;
      setReady(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [apiKey]);

  // Turf polygons
  const polygons = useMemo(() => {
    return DELIVERY_ZONES.map((zone) => ({
      ...zone,
      polygon: turf.polygon(zone.coordinates),
    }));
  }, []);

  const detectZone = useCallback(
    (coords: LngLat): IDeliveryZone | null => {

      const [lng, lat] = coords;

      if (lng === undefined || lat === undefined) {
        return null;
      }
      
      const point = turf.point([lng ,lat]);

      for (const zone of polygons) {
        if (turf.booleanPointInPolygon(point, zone.polygon)) {
          setStatus(`Доставка доступна: ${zone.title}`);
          onZoneDetect?.(zone);
          return zone;
        }
      }

      setStatus('Адрес вне зоны доставки');
      onZoneDetect?.(null);
      return null;
    },
    [polygons, onZoneDetect],
  );

  const geocode = useCallback(async () => {
    if (!search.trim()) return;

    try {
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${encodeURIComponent(
          search,
        )}`,
      );

      const data = await response.json();

      const pos =
        data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject
          ?.Point?.pos;

      if (!pos) {
        setStatus('Адрес не найден');
        return;
      }

      const [lng, lat] = pos.split(' ').map(Number);
      const coords: LngLat = [lng, lat];

      setCenter(coords);
      setZoom(15);
      setMarker(coords);

      detectZone(coords);
    } catch {
      setStatus('Ошибка геокодирования');
    }
  }, [apiKey, detectZone, search]);

  if (!ready) {
    return <div className="map-widget__loader">Загрузка карты...</div>;
  }

//   const {
//     YMap,
//     YMapMarker,
//     YMapFeature,
//     YMapDefaultSchemeLayer,
//     YMapDefaultFeaturesLayer,
//   } = reactify.bindTo(React, window.ymaps3);
const {YMap, YMapMarker, YMapFeature, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer} = reactify.module(ymaps3);

  return (
    <div className={`map-widget ${className}`}>
      <div className="map-widget__toolbar">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && geocode()}
          placeholder={placeholder}
          className="map-widget__input"
        />

        <button
          type="button"
          onClick={geocode}
          className="map-widget__button"
        >
          Проверить
        </button>
      </div>

      <div className="map-widget__status">{status}</div>

      <div className="map-widget__map">
        <YMap
          location={{
            center,
            zoom,
          }}
          mode="vector"
        >
          <YMapDefaultSchemeLayer />
          <YMapDefaultFeaturesLayer />

          {DELIVERY_ZONES.map((zone) => (
            <YMapFeature
              key={zone.id}
              geometry={{
                type: 'Polygon',
                coordinates: zone.coordinates,
              }}
              style={{
                fill: `${zone.color}55`,
                stroke: [
                  {
                    color: zone.color,
                    width: 3,
                  },
                ],
              }}
            />
          ))}

          {marker && (
            <YMapMarker coordinates={marker}>
              <div className="map-widget__marker" />
            </YMapMarker>
          )}
        </YMap>
      </div>
    </div>
  );
};

// ================================
// USAGE
// ================================

/*
<MapWidget
  apiKey="YANDEX_API_KEY"
  onZoneDetect={(zone) => console.log(zone)}
/>
*/