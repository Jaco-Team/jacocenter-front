import React from 'react';
import ReactDom from 'react-dom';


//мб создать в d.ts
declare global {
  interface Window {
    ymaps3: any;
  }
}

const [ymaps3React] = await Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready]);

export const reactify = ymaps3React.reactify.bindTo(React, ReactDom);
export const {YMap, YMapMarker, YMapFeature, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer} = reactify.module(ymaps3);