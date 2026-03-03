import { Meta, StoryObj } from '@storybook/nextjs';
import { CardsDish } from './CardsDish';
import { ICardDishProps } from '../../../shared/ui/CardDish/CardDish.types';

const meta: Meta<typeof CardsDish> = {
  title: 'widgets/CardsDish/ui',
  component: CardsDish,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    dishes: {
      control: [],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>

const exampleDishes: ICardDishProps[] = [
  { id: '1', name: 'Сет Амазония', price: 2450, description: 'Классический сет с сыром и томатами' },
  { id: '2', name: 'Сет Атлантида', price: 2350, description: 'Острые роллы с креветками' },
  { id: '3', name: 'Сет Водопад', price: 3300, description: 'Цезарь с курицей запеченный унаги, Филадельфия Лайт, Акваланг запеченный унаги, Калифорния с лососем Люкс 32 шт/1129 г.' },
  { id: '4', name: 'Сет Вулкан', price: 2400, description: 'Роллы с угрем, лососем и камбалой' },
  { id: '5', name: 'Сет Мадейра', price: 2320, description: 'С соевым соусом и овощами' },
  { id: '6', name: 'Сет Сицилия', price: 2500, description: 'С лососем и сыром' },
  { id: '7', name: 'Сет Мадагаскар', price: 1500, description: 'С курицей и соусом Цезарь' },
  { id: '8', name: 'Сет Карнавал', price: 1500, description: 'С курицей и соусом Цезарь' },
  { id: '9', name: 'Сет Милан', price: 3500, description: 'Роллы с колбасой' },
];

export const Default: Story = {
  args: {
    dishes: exampleDishes,
  }
}