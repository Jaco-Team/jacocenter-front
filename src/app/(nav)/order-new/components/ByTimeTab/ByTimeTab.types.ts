export type TimeState = {
  date: string;
  time: string;
  isTimeSaved: boolean;
  setDate: (val: string) => void;
  setTime: (val: string) => void;
  setIsTimeSaved: (val: boolean) => void;
};