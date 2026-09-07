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
  if (!apiKey) {
    throw new Error("Не задан NEXT_PUBLIC_YMAPS_API_KEY");
  }

  if (cache) return cache;

  cache = new Promise(async (resolve, reject) => {
    try {
      if (!window.ymaps3) {
        const existing = document.querySelector<HTMLScriptElement>(
          'script[data-ymaps3="true"]',
        );

        if (existing) {
          await new Promise<void>((done, fail) => {
            if (window.ymaps3) {
              done();
              return;
            }
            existing.addEventListener("load", () => done(), { once: true });
            existing.addEventListener("error", () => fail(new Error("Не удалось загрузить Яндекс.Карты")), {
              once: true,
            });
          });
        } else {
          const script = document.createElement("script");
          script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;
          script.async = true;
          script.dataset.ymaps3 = "true";
          document.body.appendChild(script);

          await new Promise<void>((done, fail) => {
            script.onload = () => done();
            script.onerror = () => fail(new Error("Не удалось загрузить Яндекс.Карты"));
          });
        }
      }

      const ymaps3 = window.ymaps3;
      if (!ymaps3) {
        throw new Error("Яндекс.Карты не инициализировались. Проверьте API-ключ.");
      }

      await ymaps3.ready;

      const ymaps3React = await ymaps3.import("@yandex/ymaps3-reactify");
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