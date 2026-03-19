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