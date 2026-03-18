import Image from 'next/image';
import './CardDish.style.css';
import { ICardDishProps } from './CardDish.types';
import { Tooltip } from '../Tooltip/Tooltip';
import { Typography } from '../Typography/Typography';

export const CardDish: React.FC<ICardDishProps> = ({
  id,
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

      {description &&
        <Tooltip
          content={
            <Typography variant='label-s-regular-12'>
              {description}
            </Typography>
          }
          placement='top'
          className='mb-3'>
          <div className='card-dish-info'>
            <Image
              src='/icons/info.svg'
              alt='Информация'
              width={20}
              height={20}
              className='card-dish-icon'
            />
          </div>
        </Tooltip>
      }
    </button>
  )
}