import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import './MapWidget.styles.css';

import type { LngLat } from '@yandex/ymaps3-types';
import { loadYmaps3 } from '../../../../lib/ymaps3';
import * as turf from '@turf/turf';

import type {
  IDeliveryZone,
  IMapWidgetProps,
  AddressCheckStatus,
} from './MapWidget.types';

import { DELIVERY_ZONES } from '@/entities/map/constants';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button/Button';
import Image from 'next/image';
import { Typography } from '@/shared/ui/Typography/Typography';


type YMapsModules = Awaited<
  ReturnType<typeof loadYmaps3>
>;

const DEFAULT_CENTER: LngLat = [37.617644, 55.755819];

export const MapWidget = ({
  apiKey,
  height,
  width,
  className = '',
  defaultCenter = DEFAULT_CENTER,
  defaultZoom = 10,
  placeholder = 'Введите адрес',
  onZoneDetect,
} : IMapWidgetProps) => {
  const [search, setSearch] = useState<string>('');
  const [center, setCenter] = useState<LngLat>(defaultCenter);
  const [zoom, setZoom] = useState(defaultZoom);
  const [marker, setMarker] = useState<LngLat | null>(null);
  const [maps, setMaps] = useState<YMapsModules | null>(null);
  const [status, setStatus] = useState<AddressCheckStatus>('idle');
  const [resolvedAddress, setResolvedAddress] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const [activeZoneId, setActiveZoneId] = useState<string | number | null>(null);
  const STORAGE_KEY = 'map-widget-history';

  useEffect(() => {
    loadYmaps3(apiKey)
      .then((modules) => {
        setMaps(modules);
      })
      .catch((error) => {
        console.error('YMaps error:', error);
      });
  }, [apiKey]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toolbarRef.current &&
        !toolbarRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
     document.removeEventListener('mousedown', handleClickOutside);
     document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const saveToHistory = useCallback((address: string) => {
    if (!address.trim()) return;

    setHistory((prev) => {
      const updated = [
        address,
        ...prev.filter((item) => item !== address),
      ].slice(0, 10);

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated),
      );

      return updated;
    });
  }, []);

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
          if (zone.status === 'stopped') {
            onZoneDetect?.(null);

            return null;
          }
          setStatus('success');
          onZoneDetect?.(zone);
          return zone;
        }
      }

      setStatus('error');
      onZoneDetect?.(null);
      return null;
    },
    [polygons, onZoneDetect],
  );

  const geocode = useCallback(async () => {
    if (!search.trim()) return;
    setStatus('idle');

    try {
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${encodeURIComponent(
          search,
        )}`,
      );

      const data = await response.json();

      const geoObject =
        data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject;

      const pos = geoObject?.Point?.pos;
      
      if (!pos) {
        setStatus('error');
        return;
      }

      const formatShortAddress = () => {
        const components =
          geoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components ?? [];

        const street = components.find((c: any) => c.kind === 'street')?.name;
        const house = components.find((c: any) => c.kind === 'house')?.name;

        if (street && house) return `${street} ${house}`;
        if (street) return street;

        return search;
      };

      const shortAddress = formatShortAddress();
      setResolvedAddress(shortAddress);
      saveToHistory(shortAddress);

      const [lng, lat] = pos.split(' ').map(Number);
      const coords: LngLat = [lng, lat];

      setCenter(coords);
      setZoom(12);
      setMarker(coords);

      detectZone(coords);
    } catch {
      setStatus('error');
    }
  }, [apiKey, detectZone, search, saveToHistory]);

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, 20));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, 1));
  };

  const markerIcon = 
    status === 'success' 
    ? '/icons/marker-success.svg' 
    : status === 'error' 
      ? '/icons/marker-error.svg' 
      : '/icons/marker-success.svg';

  const clearSearch = () => {
    setSearch('');
    setMarker(null);
  };

  const filteredHistory = history.filter((item) =>
    item.toLowerCase().startsWith(search.toLowerCase()),).slice(0,5);

  const getZoneColor = (status: IDeliveryZone['status']) => {
    return status === 'active'
      ? '#34C759'
      : '#FF3B30';
  };

  const getPolygonCenter =(coordinates: number[][][]) => {
    const polygon = turf.polygon(coordinates);
    const center = turf.centroid(polygon);
    return center.geometry.coordinates as LngLat;
  }

  if (!maps) {
    return (
      <div className='map-widget__loader' style={{width, height}}>
        Загрузка карты...
      </div>
    );
  }

  const {YMap, YMapMarker, YMapFeature, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer} = maps;

  return (
    <div className={`map-widget ${className}`}>
      <div className={`map-widget__map`} style={{width, height}}>
        <div className='map-widget__toolbar' ref={toolbarRef}>
          <Image
            src='/icons/search.svg'
            alt='Поиск'
            width={20}
            height={20}
            className='icon-search'
          />
          <div className='map-widget__input-wrapper'>
            <Input
              name='address'
              value={search}
              placeholder={placeholder}
              autoComplete='off'
              onChange={(e)=> {
                setSearch(e.target.value);
                setShowDropdown(true)
              }}
              onKeyDown={(e) => e.key === 'Enter' && geocode()}
              className={`map-widget__input ${
                status === 'error'
                  ? 'map-widget__input--error'
                  : ''
              }`}
              error={status === 'error' ? 'Адрес вне зоны доставки' : ''}
            />
          </div>
          {search && (
            <button
              type='button'
              className='search-clear'
              onClick={clearSearch}
              onMouseDown={(e) => e.preventDefault()}
              aria-label='Очистить'
            >
              <Image
                src='/icons/button-close.svg'
                alt='Очистить'
                width={14}
                height={14}
              />
            </button>
          )}
          <div className='map-widget__button-wrapper'>
            <Button
              type='button'
              variant='base'
              theme='primary'
              onClick={geocode}
              className='map-widget__button'
            >
              Найти
            </Button>
          </div>
          {showDropdown && filteredHistory.length > 0 && (
            <div className='map-widget__dropdown'>
              {filteredHistory.map((item) => (
                <button
                  key={item}
                  type='button'
                  className='map-widget__dropdown-item'
                  onClick={() => {
                    setSearch(item);
                    setShowDropdown(false);
                  }}
                >
                  <Typography variant='body-m-regular-16'>
                    {item}
                  </Typography>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className='map-widget__zoom-controls'>
          <button
            type='button'
            className='map-widget__zoom-button'
            onClick={zoomIn}
            aria-label='Увеличить карту'
          >
            <Image 
              src='/icons/plus.svg'
              alt='Увеличить карту'
              width={16}
              height={16}
            />
          </button>
          <button
            type='button'
            className='map-widget__zoom-button'
            onClick={zoomOut}
            aria-label='Уменьшить карту'
          >
            <Image 
              src='/icons/minus.svg'
              alt='Уменьшить карту'
              width={16}
              height={16}
            />
          </button>
        </div>

        <YMap
          location={{
            center,
            zoom,
          }}
          mode='vector'
          onUpdate={({ location }: any) => {
            setCenter(location.center);
            setZoom(location.zoom);
          }}
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
                fill: `${getZoneColor(zone.status)}55`,
                stroke: [
                  {
                    color: getZoneColor(zone.status),
                    width: 2,
                  },
                ],
              }}
            />      
          ))}
          {DELIVERY_ZONES.map((zone, index) => {
            const center = getPolygonCenter(zone.coordinates);

            return (
              <YMapMarker
                key={`label-${zone.id}`}
                coordinates={center}
              >
                <button
                  type='button'
                  className='map-widget__zone-marker'
                  onClick={() =>
                    setActiveZoneId((prev) =>
                      prev === zone.id ? null : zone.id
                    )
                  }
                >
                <span className={`map-widget__zone-number ${
                  activeZoneId === zone.id
                    ? 'map-widget__zone-number--active'
                    : ''
                  } ${
                  zone.status === 'stopped'
                    ? 'map-widget__zone-number--stopped'
                    : ''
                }`}>
                  <Typography variant='body-l-regular-20'>
                    {index + 1}
                  </Typography>
                </span>
                <div className={`map-widget__zone-badge ${
                  activeZoneId === zone.id
                    ? 'map-widget__zone-badge--visible'
                    : ''
                  } ${
                  zone.status === 'stopped'
                    ? 'map-widget__zone-badge--stopped'
                    : ''
                }`}>
                  <span>
                    <Typography variant='body-m-regular-16'>
                      {zone.name}
                    </Typography>
                  </span>
                </div>
                </button>
              </YMapMarker>
            );
          })}

          {marker && (
            <YMapMarker coordinates={marker}>
              <div className='map-widget__tooltip'>
                <Typography variant='label-s-regular-12'>
                  {resolvedAddress}
                </Typography>
              </div>
              <div className='map-widget__marker'>
                <Image
                  src={markerIcon}
                  alt='Маркер'
                  width={24}
                  height={24}
                /> 
              </div>
            </YMapMarker>
          )}

        </YMap>
      </div>
    </div>
  );
};