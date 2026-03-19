export type PickupState = {
  cafe: string;
  cafeCheckStatus: null | "success" | "error";
  setCafe: (val: string) => void;
  setCafeCheckStatus: (val: null | "success" | "error") => void;
};