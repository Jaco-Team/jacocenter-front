"use client";
import * as React from "react";
import * as ReactDOM from "react-dom";
import type { YMapLocationRequest, YMap as YMapType, LngLat } from "ymaps3";
import { MapProps, ReactifiedApi } from "./Map.types";
import { ZoomControls } from "./ZoomControls";
import {
  COLORS,
  ZOOM_RANGE,
  cafes,
  defaultLocation,
  deliveryZones,
} from "../../data/constants";
import { CafeMarker } from "./CafeMarker";
import { SearchInput } from "./SearchInput";
import { SearchMarker } from "./SearchMarker";
import { SearchResult } from "./SearchInput.types";
import { isPointInPolygon } from "../../data/utils";

export const Map = ({
  selectedCafeId,
  onToggleCafe,
  onSelectCafe,
}: MapProps) => {
  const [reactifiedApi, setReactifiedApi] = React.useState<ReactifiedApi>();
  const mapRef = React.useRef<YMapType | null>(null);
  const [location, setLocation] = React.useState<YMapLocationRequest>(defaultLocation);
  const [searchResult, setSearchResult] = React.useState<(SearchResult & { inDeliveryZone: boolean }) | null>(null);

  React.useEffect(() => {
    Promise.all([ymaps3.import("@yandex/ymaps3-reactify"), ymaps3.ready]).then(
      ([{ reactify }]) =>
        setReactifiedApi(reactify.bindTo(React, ReactDOM).module(ymaps3)),
    );
  }, []);

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
      onSelectCafe(null);
      return;
    }

    const matchingZone = deliveryZones.find((zone) =>
      isPointInPolygon(result.coords, zone.coordinates[0]),
    );

    setSearchResult({ ...result, inDeliveryZone: !!matchingZone });
    onSelectCafe(matchingZone?.cafeId ?? null);

    setLocation({
      center: result.coords,
      zoom: 12,
      duration: 400,
    });
  };

  if (!reactifiedApi) {
    return null;
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
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      <SearchInput
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
              onClick={() => onToggleCafe(zone.cafeId)}
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
            onClick={() => onToggleCafe(cafe.id)}
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
