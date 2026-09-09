export type Customer = {
  id: number;
  name: string;
  phone: string;
  registeredAt: string | null;
  email: string | null;
  active: boolean;
  spam: boolean;
  ordersCount: number;
  ordersSum: number;
};

export type CustomerAddress = {
  id: number;
  customerId: number;
  cityId: number;
  cityName: string;
  streetId: number;
  street: string;
  home: string;
  apartment: string;
  entrance: string;
  floor: string;
  domTrue: boolean;
  comment: string;
  isMain: boolean;
  xy: string;
  delivery: { pointId: number; sumDiv: number; freeDrive: boolean; payActive: boolean };
};

export type CustomerOrder = {
  orderId: number;
  pointId: number;
  pointName: string;
  dateTime: string;
  isPreorder: boolean;
  sum: number;
  type: number;
  typeLabel: string;
  status: number;
  statusLabel: string;
  timeToClient: string | null;
  steps: Array<{ name: string; active: number }>;
};

export type CustomerLookup = {
  phone: string;
  registered: boolean;
  customer: Customer | null;
  lastOrder: { orderId: number; cityId: number; pointId: number | null; date: string | null; time: string | null; sum: number; typeOrder: number } | null;
  lastOrderState: string;
  addresses: CustomerAddress[];
};

export type CustomerAddressInput = {
  cityId?: number;
  streetId?: number;
  apartment?: string | null;
  entrance?: string | null;
  floor?: string | null;
  domTrue?: boolean;
  comment?: string | null;
  isMain?: boolean;
};
