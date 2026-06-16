import React from 'react';
import { ICardsDishProps } from './CardsDish.types';
import { CardDish } from '../../../shared/ui/CardDish/CardDish';
import './CardsDish.style.css';

export const CardsDish: React.FC<ICardsDishProps> = ({ 
  dishes,
}) => {
  return (
    <div className='cards-dish'>
      {dishes.map((dish) => (
        <CardDish
          key={dish.id}
          {...dish}
        />
      ))}
    </div>
  );
};