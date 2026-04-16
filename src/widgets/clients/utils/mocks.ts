import { Promocode } from "../ui/PromocodeList/PromocodeList.types";

export const promocodesData: Promocode[]  = [
  {
    promocode: "Супер жор в день рождения Again!",
    status: "Активен",
    expiresAt: "2026-02-21",
    isApplied: false,
    description: "Промокод действует до 21.02.2026 при заказе новинок из меню: пицца Сливочный лосось, сет Карнавал, ролл Парусник",
  },
  {
    promocode: "Супер жор в день рождения!",
    status: "Активен",
    expiresAt: "2026-02-15",
    isApplied: false,
    description: "Промокод действует до 15.02.2026 при заказе от 949 р.",
  },
  {
    promocode: "Хрюк",
    status: "Не действителен",
    expiresAt: "2025-12-15",
    isApplied: false,
    description: "Акция действует с понедельника по пятницу на доставку, самовывоз и заказы в кафе до 15.12.2025 г.",
  },
  {
    promocode: "Трям с друзьями!",
    status: "Использован",
    expiresAt: "2025-09-20",
    isApplied: true,
    description: "Акция действует ежедневно до 20.09.2025 г. на доставку, самовывоз и заказы в кафе",
  },
];