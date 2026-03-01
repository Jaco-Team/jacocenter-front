import Image from 'next/image';
import './CardDish.style.css';
import { ICardDishProps } from './CardDish.types';

export const CardDish: React.FC<ICardDishProps> = ({
  name,
  price,
  currency = 'p.',
  description,
  onClick,
}) => {
  return (
    <button 
      type='button'
      onClick={onClick}
      className='card-dish'
    >
      <div className='content'>
        <span className='card-dish-title'>{name}</span>
        <span className='card-dish-price'>
          {price} {currency}
        </span>
      </div>

      <div className='card-dish-info'>
        <Image
          src='/icons/info.svg'
          alt='Информация'
          width={20}
          height={20}
          className='card-dish-icon'
        />

        {description && (
          <div className='card-dish-tooltip'>
            {description}
          </div>
        )}
      </div>
    </button>
  )
}