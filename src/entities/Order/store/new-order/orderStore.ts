import { create } from 'zustand';
import { CartItem } from '@/widgets/Order/ui/Cart/Cart.types';
import { ORDER_STEP } from '@/utils/constants';
import { mockCities } from '@/app/currentOrder/mocks';

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

interface OrderState {
  step: ORDER_STEP;
  items: CartItem[];
  city: string;
  phone: string;
  promocode: string;
  delivery: DeliveryForm;
  pickup: PickupForm;
  payment: PaymentForm;
  time: TimeForm;
}

interface OrderActions {
  setStep: (step: ORDER_STEP) => void;

  addItem: (item: Omit<CartItem, 'count'>) => void;
  increaseItem: (id: string) => void;
  decreaseItem: (id: string) => void;
  deleteItem: (id: string) => void;

  setCity: (city: string) => void;
  setPhone: (val: string) => void;
  setPromocode: (val: string) => void;

  setDelivery: (val: Partial<DeliveryForm>) => void;
  setPickup: (val: Partial<PickupForm>) => void;
  setPayment: (val: Partial<PaymentForm>) => void;
  setTime: (val: Partial<TimeForm>) => void;

  resetOrder: () => void;
}

const initialState: OrderState = {
  step: ORDER_STEP.CART,
  items: [],
  city: mockCities[0],
  phone: '',
  promocode: '',
  delivery: {
    address: '',
    building: '',
    entrance: '',
    floor: '',
    apartment: '',
    intercom: null,
    addressCheckStatus: null,
  },
  pickup: {
    cafe: '',
    cafeCheckStatus: null,
  },
  payment: {
    method: null,
    cashAmount: '',
    comment: '',
  },
  time: {
    date: '',
    time: '',
    isTimeSaved: false,
  },
};

type OrderStore = OrderState & OrderActions;

export const useOrderStore = create<OrderStore>((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),

  // Корзина
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      return {
        items: existing
          ? state.items.map((i) =>
              i.id === item.id ? { ...i, count: i.count + 1 } : i,
            )
          : [...state.items, { ...item, count: 1 }],
      };
    }),
  increaseItem: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, count: i.count + 1 } : i,
      ),
    })),
  decreaseItem: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id && i.count > 1 ? { ...i, count: i.count - 1 } : i,
      ),
    })),
  deleteItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),


  // Шапка
  setCity: (city) => set({ city }),
  setPhone: (phone) => set({ phone }),
  setPromocode: (promocode) => set({ promocode }),

  // Формы
  setDelivery: (val) =>
    set((state) => ({ delivery: { ...state.delivery, ...val } })),
  setPickup: (val) =>
    set((state) => ({ pickup: { ...state.pickup, ...val } })),
  setPayment: (val) =>
    set((state) => ({ payment: { ...state.payment, ...val } })),
  setTime: (val) =>
    set((state) => ({ time: { ...state.time, ...val } })),

  // Сброс
  resetOrder: () => set(initialState),
}));