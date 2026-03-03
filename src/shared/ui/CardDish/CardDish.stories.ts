import { Meta, StoryObj } from '@storybook/nextjs';
import { CardDish } from './CardDish';

const meta: Meta<typeof CardDish> = {
  title: 'UI/CardDish',
  component: CardDish,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    name: {
      control: 'text',
    },
    price: {
      control: 'number',
    },
    description: {
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Сет Мадагаскар',
    price: 2769,
    description: 'Цезарь с курицей запеченный унаги, Филадельфия Лайт, Акваланг запеченный унаги, Калифорния с лососем Люкс 32 шт/1129 г.',
  },
}

export const Short: Story = {
  args: {
    name: 'Сет Мадейра',
    price: 2100,
    description: 'Филадельфия 40 шт.'
  }
}


