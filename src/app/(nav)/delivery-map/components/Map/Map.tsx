"use client";

import * as React from "react";
import type { YMapLocationRequest, YMap as YMapType, LngLat } from "ymaps3";
import { ReactifiedApi } from "./Map.types";
import { ZoomControls } from "./ZoomControls";
import {
  COLORS,
  DEFAULT_ZOOM,
  ZOOM_RANGE,
  cafes,
  defaultLocation,
  deliveryZones,
} from "../../data/constants";
import { CafeMarker } from "./CafeMarker";
import { SearchInput } from "./SearchInput";
import { SearchMarker } from "./SearchMarker";
import { SearchResult } from "./SearchInput.types";
import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon";
import { useMapStore } from "@/entities/map/store/mapStore/mapStore";
import { isPointInBounds } from "../../data/utils";
import { loadYmaps3 } from "@/lib/ymaps3";
import { Text } from "@/shared/ui/Typography/Typography";

const apiKey = process.env.NEXT_PUBLIC_YMAPS_API_KEY ?? "";

export const Map = () => {
  const [reactifiedApi, setReactifiedApi] = React.useState<ReactifiedApi>();
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const mapRef = React.useRef<YMapType | null>(null);
  const [location, setLocation] =
    React.useState<YMapLocationRequest>(defaultLocation);

  const searchResult = useMapStore((s) => s.searchResult);
  const selectedCafeId = useMapStore((s) => s.selectedCafeId);
  const setSearchResult = useMapStore((s) => s.setSearchResult);
  const toggleCafe = useMapStore((s) => s.toggleCafe);
  const selectCafe = useMapStore((s) => s.selectCafe);

  React.useEffect(() => {
    let cancelled = false;

    loadYmaps3(apiKey)
      .then((modules) => {
        if (!cancelled) {
          setReactifiedApi(modules as ReactifiedApi);
          setLoadError(null);
        }
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        console.error("YMaps error:", error);
        setLoadError(
          error instanceof Error
            ? error.message
            : "Не удалось загрузить карту",
        );
      });

    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    if (!selectedCafeId || !mapRef.current) return;

    const cafe = cafes.find((c) => c.id === selectedCafeId);
    if (!cafe) return;

    if (!isPointInBounds(cafe.coordinates, mapRef.current.bounds)) {
      setLocation({
        center: cafe.coordinates,
        zoom: DEFAULT_ZOOM,
        duration: 400,
      });
    }
  }, [selectedCafeId]);

  const changeZoom = (delta: number) => {
    const map = mapRef.current;
    if (!map) return;
    setLocation({
      center: map.center as LngLat,
      zoom: Math.min(
        Math.max(map.zoom + delta, ZOOM_RANGE.min),
        ZOOM_RANGE.max,
      ),
      duration: 200,
    });
  };

  const handleSearchResult = (result: SearchResult | null) => {
    if (!result) {
      setSearchResult(null);
      selectCafe(null);
      return;
    }

    const matchingZone = deliveryZones.find((zone) =>
      booleanPointInPolygon(
        { type: "Point", coordinates: result.coords as [number, number] },
        { type: "Polygon", coordinates: zone.coordinates as [number, number][][] },
      ),
    );

    setSearchResult({
      ...result,
      inDeliveryZone: !!matchingZone,
      cafeId: matchingZone?.cafeId ?? null,
    });
    selectCafe(matchingZone?.cafeId ?? null);

    setLocation({
      center: result.coords,
      zoom: DEFAULT_ZOOM,
      duration: 400,
    });
  };

  if (loadError) {
    return (
      <div className="relative flex h-full w-full min-w-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-xl bg-bg-base-light px-6 text-center">
        <Text variant="body-m-medium-16" className="text-text-base">
          Карта недоступна
        </Text>
        <Text variant="body-m-regular-16" className="text-text-secondary">
          {loadError}
        </Text>
        {!apiKey && (
          <Text variant="label-s-regular-12" className="text-text-secondary">
            Добавьте ключ в `.env.local`: NEXT_PUBLIC_YMAPS_API_KEY=…
          </Text>
        )}
      </div>
    );
  }

  if (!reactifiedApi) {
    return (
      <div className="relative flex h-full w-full min-w-0 items-center justify-center overflow-hidden rounded-xl bg-bg-base-light">
        <Text variant="body-m-regular-16" className="text-text-secondary">
          Загрузка карты…
        </Text>
      </div>
    );
  }

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapFeature,
    YMapMarker,
  } = reactifiedApi;

  const isOutOfZone = searchResult !== null && !searchResult.inDeliveryZone;

  return (
    <div className="relative h-full w-full min-w-0 overflow-hidden rounded-xl">
      <SearchInput
        selectedAddress={searchResult}
        onSelectAddress={handleSearchResult}
        externalError={isOutOfZone ? "Адрес вне зоны доставки" : null}
        className="absolute top-3 left-3 right-3 z-10"
      />
      <YMap ref={mapRef} location={location} zoomRange={ZOOM_RANGE}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />

        {searchResult && (
          <YMapMarker coordinates={searchResult.coords}>
            <SearchMarker
              address={searchResult.address}
              inDeliveryZone={searchResult.inDeliveryZone}
            />
          </YMapMarker>
        )}

        {deliveryZones.map((zone) => {
          const color =
            zone.cafeId === selectedCafeId ? COLORS.selected : COLORS.default;
          return (
            <YMapFeature
              key={zone.id}
              geometry={{ type: "Polygon", coordinates: zone.coordinates }}
              onClick={() => toggleCafe(zone.cafeId)}
              style={{
                fill: color.fill,
                stroke: [{ width: 2, color: color.stroke }],
                cursor: "pointer",
              }}
            />
          );
        })}

        {cafes.map((cafe) => (
          <YMapMarker
            key={cafe.id}
            coordinates={cafe.coordinates}
            onClick={() => toggleCafe(cafe.id)}
          >
            <CafeMarker cafe={cafe} isSelected={cafe.id === selectedCafeId} />
          </YMapMarker>
        ))}
      </YMap>
      <ZoomControls
        onZoomIn={() => changeZoom(1)}
        onZoomOut={() => changeZoom(-1)}
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2"
      />
    </div>
  );
};
