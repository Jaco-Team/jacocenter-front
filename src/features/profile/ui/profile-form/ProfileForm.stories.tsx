import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useSessionStore } from '@/entities/auth/store/sessionStore/sessionStore';
import { ProfileForm } from './ProfileForm';

const user = {
  id: 12,
  login: 'operator',
  name: 'Иван',
  fullName: 'Иван Иванов',
  shortName: 'Иван',
  firstName: 'Иван',
  lastName: 'Иванов',
  middleName: 'Иванович',
  registeredAt: '2025-06-04',
  birthday: '2000-01-01',
};

const meta = {
  title: 'Features/Profile/ProfileForm',
  component: ProfileForm,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => {
      useSessionStore.setState({ user, status: 'ready' });
      return <div className="w-[720px] max-w-full"><Story /></div>;
    },
  ],
} satisfies Meta<typeof ProfileForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Saving: Story = {
  args: {
    saveProfile: () => new Promise(() => undefined),
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Сохранить' }));
    await expect(within(canvasElement).getByRole('button', { name: 'Сохраняем…' })).toBeDisabled();
  },
};

export const RequestError: Story = {
  args: {
    saveProfile: async () => {
      throw new Error('Не удалось сохранить профиль');
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Сохранить' }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent('Не удалось сохранить профиль');
  },
};
