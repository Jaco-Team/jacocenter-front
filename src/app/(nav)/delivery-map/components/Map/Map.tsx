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

export const Map = ({
  selectedCafeId,
  onToggleCafe,
}: MapProps) => {
  const [reactifiedApi, setReactifiedApi] = React.useState<ReactifiedApi>();
  const mapRef = React.useRef<YMapType | null>(null);
  const [location, setLocation] = React.useState<YMapLocationRequest>(defaultLocation);

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

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      <YMap ref={mapRef} location={location} zoomRange={ZOOM_RANGE}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />

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
