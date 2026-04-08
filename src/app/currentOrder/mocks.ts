import { CategoryItem } from '@/widgets/Categories/ui/Categories/Categories.types';
import { ICardDishProps } from '@/shared/ui/CardDish/CardDish.types';

export const mockCategories: CategoryItem[] = [
  { id: 1, name: 'Сеты' },
  { id: 2, name: 'Комбо' },
  { id: 3, name: 'Закуски' },
  { id: 4, name: 'Пицца' },
  { id: 5, name: 'Паста' },
  { id: 6, name: 'Напитки' },
  { id: 7, name: 'Соусы' },
  { id: 8, name: 'Классические роллы' },
  { id: 9, name: 'Фирменные роллы' },
  { id: 10, name: 'Жаренные роллы' },
  { id: 11, name: 'Запечённые роллы' },
];

export const mockDishes: ICardDishProps[] = [
  { id: '1', name: 'Сет Амазония', price: 2769, description: 'Лосось, тунец, угорь, огурец, сливочный сыр' },
  { id: '2', name: 'Сет Атлантида', price: 2769, description: 'Лосось, авокадо, огурец, сливочный сыр' },
  { id: '3', name: 'Сет Водопад', price: 2769, description: 'Тунец, огурец, авокадо, кунжут' },
  { id: '4', name: 'Сет Вулкан', price: 2769, description: 'Запечённый лосось, сливочный сыр, огурец' },
  { id: '5', name: 'Сет Мадейра', price: 2769, description: 'Креветка, авокадо, огурец, икра тобико' },
  { id: '6', name: 'Сет Сицилия', price: 2769, description: 'Угорь, огурец, сливочный сыр, кунжут' },
  { id: '7', name: 'Сет Карнавал', price: 2769, description: 'Лосось, тунец, авокадо, огурец' },
  { id: '8', name: 'Сет Мадагаскар', price: 2769, description: 'Запечённые роллы с лососем и сыром' },
];

export const mockStopOrders = [
  { label: 'Зона 1 - Молодёжная 2', description: 'до 14.00' },
  { label: 'Зона 3 - Куйбышева 113', description: 'до 12.30' },
];

export const mockCafeList = [
  { id: 1, name: 'Молодёжная 2' },
  { id: 2, name: 'Куйбышева 113' },
  { id: 3, name: 'Ленинградская 27' },
];

export const mockCities = [
  { id: 1, name: 'Тольятти' },
  { id: 2, name: 'Самара' },
];