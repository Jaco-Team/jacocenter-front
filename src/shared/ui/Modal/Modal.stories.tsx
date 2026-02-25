import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Modal } from './Modal';
import { ModalProps } from './Modal.types';
import { Text } from '../Typography/Typography';

const meta = {
  title: 'Shared/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isAccent: { control: 'boolean', description: 'Акцентный цвет шапки'},
    title: { control: 'text', description: 'Заголовок модального окна' },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof Modal>;

const ModalWrapper = ({ title, isAccent, children }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
   <>
    <button onClick={() => setIsOpen(true)} 
      className='mb-4 px-4 py-2 text-sm rounded-lg border border-gray-300 cursor-pointer bg-gray-100 hover:bg-gray-200'
    >
        Открыть модалку
    </button>
    <Modal
      title={title}
      isAccent={isAccent}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      {children}
    </Modal>
   </>
  );
};

export const Default: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div className='w-[392px] p-[20px]'>
        <Text>Содержимое модального окна</Text>
      </div>
    </ModalWrapper>
  ),
  args: {
    title: 'Заголовок',
    isAccent: false,
  },
};

export const Accent: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div className='w-[392px] p-[20px]'>
        <Text>Содержимое акцентного модального окна</Text>
      </div>
    </ModalWrapper>
  ),
  args: {
    title: 'Заголовок accent',
    isAccent: true,
  },
};

export const CompositeTitle: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div className='w-[392px] p-[20px]'>
        <Text>Содержимое модального окна с заголовком с разными вариантами шрифтов</Text>
      </div>
    </ModalWrapper>
  ),
  args: {
    title: (
      <>
        <Text variant="body-l-medium-20">Предпросмотр</Text>{' '}
        <Text variant="label-s-regular-12">Заказ № 800602</Text>
      </>
    ),
    isAccent: false,
  },
};
