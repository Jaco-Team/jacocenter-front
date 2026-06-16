import React from 'react';
import WriteIcon from '@/../public/icons/write.svg?react';
import ClientsIcon from '@/../public/icons/clients.svg?react';
import OrdersIcon from '@/../public/icons/orders.svg?react';
import KitchenIcon from '@/../public/icons/kitchen.svg?react';
import MapIcon from '@/../public/icons/map.svg?react';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export const navPanelMock: NavItem[] = [
  {
    label: 'Оформить заказ',
    href: '/order-new',
    icon: <WriteIcon />,
  },
  {
    label: 'Клиенты',
    href: '/clients',
    icon: <ClientsIcon/>,
  },
  {
    label: 'Все заказы',
    href: '/orders',
    icon: <OrdersIcon />,
  },
  {
    label: 'Заказы на кухне',
    href: '/kitchen',
    icon: <KitchenIcon/>,
  },
  {
    label: 'Карта доставки',
    href: '/delivery-map',
    icon: <MapIcon />,
  },
];