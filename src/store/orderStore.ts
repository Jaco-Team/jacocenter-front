import { create } from 'zustand';
import { CartItem } from '@/widgets/Order/ui/Cart/Cart.types';
import { ORDER_STEP } from '@/utils/constants';

// Форма доставки
interface DeliveryForm {
  address: string;
  building: string;
  entrance: string;
  floor: string;
  apartment: string;
  intercom: 'working' | 'not-working' | null;
  addressCheckStatus: null | 'success' | 'error';
}

interface PickupForm {
  cafe: string;
  cafeCheckStatus: null | 'success' | 'error';
}

interface PaymentForm {
  method: 'cash' | 'card' | null;
  cashAmount: string;
  comment: string;
}

interface TimeForm {
  date: string;
  time: string;
  isTimeSaved: boolean;
}

interface OrderStore {
  // Шаг
  step: ORDER_STEP;
  setStep: (step: ORDER_STEP) => void;

  // Корзина
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'count'>) => void;
  increaseItem: (id: string) => void;
  decreaseItem: (id: string) => void;
  deleteItem: (id: string) => void;
  clearCart: () => void;

  // Телефон и промокод (шапка)
  phone: string;
  setPhone: (val: string) => void;
  promocode: string;
  setPromocode: (val: string) => void;

  // Форма доставки
  delivery: DeliveryForm;
  setDelivery: (val: Partial<DeliveryForm>) => void;

  // Форма самовывоза
  pickup: PickupForm;
  setPickup: (val: Partial<PickupForm>) => void;

  // Оплата
  payment: PaymentForm;
  setPayment: (val: Partial<PaymentForm>) => void;

  // Время
  time: TimeForm;
  setTime: (val: Partial<TimeForm>) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  step: ORDER_STEP.CART,
  setStep: (step) => set({ step }),

  // Корзина
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, count: i.count + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, count: 1 }] };
    }),
  increaseItem: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, count: i.count + 1 } : i
      ),
    })),
  decreaseItem: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id && i.count > 1 ? { ...i, count: i.count - 1 } : i
      ),
    })),
  deleteItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clearCart: () => set({ items: [] }),

  // Телефон и промокод
  phone: '',
  setPhone: (val) => set({ phone: val }),
  promocode: '',
  setPromocode: (val) => set({ promocode: val }),

  // Форма доставки
  delivery: {
    address: '',
    building: '',
    entrance: '',
    floor: '',
    apartment: '',
    intercom: null,
    addressCheckStatus: null,
  },
  setDelivery: (val) =>
    set((state) => ({ delivery: { ...state.delivery, ...val } })),

  // Самовывоз
  pickup: {
    cafe: '',
    cafeCheckStatus: null,
  },
  setPickup: (val) =>
    set((state) => ({ pickup: { ...state.pickup, ...val } })),

  // Оплата
  payment: {
    method: null,
    cashAmount: '',
    comment: '',
  },
  setPayment: (val) =>
    set((state) => ({ payment: { ...state.payment, ...val } })),

  // Время
  time: {
    date: '',
    time: '',
    isTimeSaved: false,
  },
  setTime: (val) =>
    set((state) => ({ time: { ...state.time, ...val } })),
}));