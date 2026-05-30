"use client";
import * as React from "react";
import * as ReactDOM from "react-dom";
import type { YMapLocationRequest } from "@yandex/ymaps3-types";
import { ReactifiedApi } from "./Map.types";

const LOCATION: YMapLocationRequest = {
  center: [49.415377, 53.518271],
  zoom: 12,
};

export const Map = () => {
  const [reactifiedApi, setReactifiedApi] = React.useState<ReactifiedApi>();

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

  return (
    <div className="h-full w-full overflow-hidden rounded-xl">
      <YMap location={LOCATION}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
      </YMap>
    </div>
  );
};
