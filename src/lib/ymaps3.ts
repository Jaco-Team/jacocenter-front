import React from 'react';
import ReactDOM from 'react-dom';

declare global {
  interface Window {
    ymaps3?: any;
  }
}

let cache: Promise<any> | null = null;

export const loadYmaps3 = async (
  apiKey: string,
) => {
  if (cache) return cache;

  cache = new Promise(async (resolve, reject) => {
    try {
      if (!window.ymaps3) {
        const script = document.createElement('script');

        script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;

        script.async = true;

        document.body.appendChild(script);

        await new Promise((done, fail) => {
          script.onload = done;
          script.onerror = fail;
        });
      }

      const ymaps3 = window.ymaps3;

      await ymaps3.ready;

      const ymaps3React = await ymaps3.import('@yandex/ymaps3-reactify');

      const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);

      const modules = reactify.module(ymaps3);

      resolve(modules);
    } catch (error) {
        cache = null;
        reject(error);
      }
  });

  return cache;
};