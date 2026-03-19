export type PaymentState = {
  method: "cash" | "card" | null;
  cashAmount: string;
  comment: string;
  setMethod: (val: "cash" | "card") => void;
  setCashAmount: (val: string) => void;
  setComment: (val: string) => void;
};