import type { Meta, StoryObj } from '@storybook/nextjs';
import { ProfileAvatar } from './ProfileAvatar';

const meta = {
  title: 'Entities/Auth/ProfileAvatar',
  component: ProfileAvatar,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ProfileAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: {
      id: 12,
      login: 'operator',
      name: 'Иван',
      fullName: 'Иван Иванов',
      shortName: 'Иван',
    },
  },
};

export const WithoutName: Story = {
  args: {
    user: {
      id: 12,
      login: 'operator',
      name: '',
      fullName: '',
      shortName: '',
    },
  },
};

export const Loading: Story = {
  args: { user: null },
};
