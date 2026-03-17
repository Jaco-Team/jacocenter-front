export interface DeliveryFormProps {
  deliveryState: DeliveryState;
  pickupState: PickupState;
  timeState: TimeState;
  paymentState: PaymentState;
  cafeList: { id: number; name: string }[];
}

export type DeliveryState = {
  address: string;
  building: string;
  entrance: string;
  floor: string;
  apartment: string;
  intercom: "working" | "not-working" | null;
  addressCheckStatus: null | "success" | "error";
  setAddress: (val: string) => void;
  setBuilding: (val: string) => void;
  setEntrance: (val: string) => void;
  setFloor: (val: string) => void;
  setApartment: (val: string) => void;
  setIntercom: (val: "working" | "not-working") => void;
  setAddressCheckStatus: (val: null | "success" | "error") => void;
};

export type PickupState = {
  cafe: string;
  cafeCheckStatus: null | "success" | "error";
  setCafe: (val: string) => void;
  setCafeCheckStatus: (val: null | "success" | "error") => void;
};

export type TimeState = {
  date: string;
  time: string;
  isTimeSaved: boolean;
  setDate: (val: string) => void;
  setTime: (val: string) => void;
  setIsTimeSaved: (val: boolean) => void;
};

export type PaymentState = {
  method: "cash" | "card" | null;
  cashAmount: string;
  comment: string;
  setMethod: (val: "cash" | "card") => void;
  setCashAmount: (val: string) => void;
  setComment: (val: string) => void;
};