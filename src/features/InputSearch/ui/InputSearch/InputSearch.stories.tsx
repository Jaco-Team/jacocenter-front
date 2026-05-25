import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputSearch } from './InputSearch';

const mock = [
  {id: "1", name: "Сет Атлантида"},
  {id: "2", name: "Сет Амазония"},
  {id: "3", name: "Сет Водопад"},
  {id: "4", name: "Сет Вулкан"},
  {id: "5", name: "Сет Доминикана"},
  {id: "6", name: "Сет Карнавал"},
  {id: "7", name: "Сет Мадагаскар"},
  {id: "8", name: "Сет Сицилия"},
];

const meta = {
  title: 'features/InputSearch',
  component: InputSearch,
  args: {
    options: mock,
  },
  decorators: [
    (Story) => (
      <div className="w-[704px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};


