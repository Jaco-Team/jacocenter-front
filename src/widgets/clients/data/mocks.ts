import { OrderHistoryRow } from '../ui/OrdersHistory/OrdersHistory.types';

export const orderHistoryMock: OrderHistoryRow[] = [
  {
    date: '01.10.25',
    orderNumber: '#011014',
    status: 'Доставлен',
    total: 3500,
    canRepeat: true,
    onShowComposition: () => alert('Состав #011014'),
    onRepeat: () => alert('Повторить #011014'),
  },
  {
    date: '15.09.25',
    orderNumber: '#150906',
    status: 'Доставлен',
    total: 7450,
    canRepeat: true,
    onShowComposition: () => alert('Состав #150906'),
    onRepeat: () => alert('Повторить #150906'),
  },
  {
    date: '01.09.25',
    orderNumber: '#010918',
    status: 'Доставлен',
    total: 5590,
    canRepeat: true,
    onShowComposition: () => alert('Состав #010918'),
    onRepeat: () => alert('Повторить #010918'),
  },
  {
    date: '01.10.25',
    orderNumber: '#12345',
    status: 'Доставлен',
    total: 3500,
    canRepeat: false,
    onShowComposition: () => alert('Состав #12345'),
  },
];

export const sampleItems = [
  { name: 'Филадельфия Лайт', quantity: 1, price: 339 },
  { name: 'Акваланг запечённый унаги', quantity: 1, price: 319 },
  { name: 'Коралл запечённый унаги', quantity: 1, price: 229 },
  { name: 'Ролл Жако', quantity: 1, price: 0 },
  { name: 'Васаби', quantity: 2, price: 18 },
  { name: 'Вилка', quantity: 5, price: 0 },
  { name: 'Палочки', quantity: 2, price: 0 },
];

export const baseOrderDetails = {
  title: 'Заказ № 800602 от 23 октября 2025',
  deliveryTime: 'Время ожидания 0:45-1:15',
  clientPhone: '+7 (999) 999-99-99',
  address: 'г. Тольятти, ул. Ленинградская, 27, п.1, эт.3, кв.15',
  intercom: 'работает',
  payment: 'Наличный расчёт\nСдача с 5 000 рублей',
  promocode: 'ПТЮИУЦУ6',
  promocodeDescription: 'Бесплатный ролл Жако. С Днем Рождения!)',
  comment: 'Позвонить за 30 минут для заказа пропуска',
  items: sampleItems,
  totalPrice: 975,
}