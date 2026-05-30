"use client";
import * as React from "react";
import * as ReactDOM from "react-dom";
import type { YMapLocationRequest, YMap as YMapType, LngLat } from "ymaps3";
import { ReactifiedApi } from "./Map.types";
import { ZoomControls } from "./ZoomControls";

const LOCATION: YMapLocationRequest = {
  center: [49.415377, 53.518271],
  zoom: 12,
};

const ZOOM_RANGE = { min: 9, max: 19 };

export const Map = () => {
  const [reactifiedApi, setReactifiedApi] = React.useState<ReactifiedApi>();
  const mapRef = React.useRef<YMapType | null>(null);
  const [location, setLocation] = React.useState<YMapLocationRequest>(LOCATION);

  React.useEffect(() => {
    Promise.all([ymaps3.import("@yandex/ymaps3-reactify"), ymaps3.ready]).then(
      ([{ reactify }]) =>
        setReactifiedApi(reactify.bindTo(React, ReactDOM).module(ymaps3)),
    );
  }, []);

  if (!reactifiedApi) {
    return null;
  }

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } =
    reactifiedApi;

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

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      <YMap ref={mapRef} location={location} zoomRange={ZOOM_RANGE}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
      </YMap>
      <ZoomControls
        onZoomIn={() => changeZoom(1)}
        onZoomOut={() => changeZoom(-1)}
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2"
      />
    </div>
  );
};
