import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from './Typography';
import type { TypographyVariant } from './Typography.types';

const meta = {
  title: 'UI/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'heading-l-regular-20',
        'body-l-medium-20',
        'body-l-regular-20',
        'body-m-medium-16',
        'body-m-regular-16',
        'label-s-regular-12',
        'label-s-semibold-12',
        ] satisfies TypographyVariant[],
    },
    Tag: {
      control: 'select',
      options: ['h3', 'span'],
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: 'Пример текста',
    variant: 'body-m-regular-16',
    Tag: 'span',
  },
};

export const HeadingLRegular20: Story = {
  name: 'Heading / L-regular-20',
  args: {
    children: 'Heading / L-regular-20 — Заголовок',
    variant: 'heading-l-regular-20',
    Tag: 'h3',
  },
};

export const BodyLMedium20: Story = {
  name: 'Body / L-medium-20',
  args: {
    children: 'Body / L-medium-20 — Выделенный текст',
    variant: 'body-l-medium-20',
    Tag: 'span',
  },
};

export const BodyLRegular20: Story = {
  name: 'Body / L-regular-20',
  args: {
    children: 'Body / L-regular-20 — Выделенный текст',
    variant: 'body-l-regular-20',
    Tag: 'span',
  },
};

export const BodyMMedium16: Story = {
  name: 'Body / M-medium-16',
  args: {
    children: 'Body / M-medium-16 — Выделенный текст',
    variant: 'body-m-medium-16',
    Tag: 'span',
  },
};

export const BodyMRegular16: Story = {
name: 'Body / M-regular-16',
  args: {
    children: 'Body / M-regular-16 — Обычный текст',
    variant: 'body-m-regular-16',
    Tag: 'span',
  },
};

export const LabelSRegular12: Story = {
  name: 'Label / S-regular-12',
  args: {
    children: 'Label / S-regular-12 — Уменьшенный текст',
    variant: 'label-s-regular-12',
    Tag: 'span',
  },
};

export const LabelSSemibold12: Story = {
  name: 'Label / S-semibold-12',
  args: {
    children: 'Label / S-semibold-12 — Уменьшенный выделенный текст',
    variant: 'label-s-semibold-12',
    Tag: 'span',
  },
};
