interface Dish {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  description?: string;
}

interface Category {
  id: string;
  name: string;
}

export const mockCategories: Category[] = [
  { id: '1', name: 'Сеты' },
  { id: '2', name: 'Комбо' },
  { id: '3', name: 'Закуски' },
  { id: '4', name: 'Пицца' },
  { id: '5', name: 'Паста' },
  { id: '6', name: 'Напитки' },
  { id: '7', name: 'Соусы' },
  { id: '8', name: 'Классические роллы' },
  { id: '9', name: 'Фирменные роллы' },
  { id: '10', name: 'Жаренные роллы' },
  { id: '11', name: 'Запечённые роллы' },
];

export const mockDishes: Dish[] = [
  { id: '1', categoryId: '1', name: 'Сет Амазония', price: 2769, description: 'Лосось, тунец, угорь, огурец, сливочный сыр' },
  { id: '2', categoryId: '1', name: 'Сет Атлантида', price: 2769, description: 'Лосось, авокадо, огурец, сливочный сыр' },
  { id: '3', categoryId: '1', name: 'Сет Водопад', price: 2769, description: 'Тунец, огурец, авокадо, кунжут' },
  { id: '4', categoryId: '1', name: 'Сет Вулкан', price: 2769, description: 'Запечённый лосось, сливочный сыр, огурец' },
  { id: '5', categoryId: '1', name: 'Сет Мадейра', price: 2769, description: 'Креветка, авокадо, огурец, икра тобико' },
  { id: '6', categoryId: '1', name: 'Сет Сицилия', price: 2769, description: 'Угорь, огурец, сливочный сыр, кунжут' },
  { id: '7', categoryId: '1', name: 'Сет Карнавал', price: 2769, description: 'Лосось, тунец, авокадо, огурец' },
  { id: '8', categoryId: '1', name: 'Сет Мадагаскар', price: 2769, description: 'Запечённые роллы с лососем и сыром' },
  { id: '9', categoryId: '4', name: 'Пепперони', price: 2769, description: 'Колбаски пепперони, сыр моцарелла, томатный соус' },
  { id: '10', categoryId: '4', name: 'Ветчина и сыр', price: 2769, description: 'Ветчина, сыр моцарелла, соус белый' },
  { id: '11', categoryId: '4', name: 'Пицца Жако', price: 2769, description: 'Колбаски пепперони, ветчина, шампиньоны, черри, болгарский перец, моцарелла, томатный и белый соусы' },
  { id: '12', categoryId: '8', name: 'Классика с лососем', price: 2769, description: 'Слабосолёный лосось' },
  { id: '13', categoryId: '8', name: 'Классика с креветкой', price: 2769, description: 'Отборная креветка' },
  { id: '14', categoryId: '8', name: 'Классика с угрём', price: 2769, description: 'Угорь, соус унаги, кунжут' },
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
  'Тольятти',
  'Самара',
];

export const promocodesList = [
  {
    promocode: 'ВКУСНО',
    description: 'Промокод действует до 21.02.2026 при заказе новинок из меню: пицца Сливочный лосось, сет Карнавал, ролл Парусник',
  },
  {
    promocode: 'МАМБО',
    description: 'Промокод действует до 15.02.2026 при заказе от 949 р.',
  },
  {
    promocode: 'ЖАКОМБО',
    description: 'Акция действует с понедельника по пятницу на доставку, самовывоз и заказы в кафе до 15.12.2025 г.',
  },
  {
    promocode: 'КОКОДЖАМБО',
    description: 'Акция действует ежедневно до 20.09.2025 г. на доставку, самовывоз и заказы в кафе',
  },
];
