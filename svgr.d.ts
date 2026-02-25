// импорт иконок как компонента
declare module '*.svg?react' {
  import React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

// Обычный импорт SVG (как картинки)
declare module '*.svg' {
  import { StaticImageData } from 'next/image';

  const content: StaticImageData;
  export default content;
}
