import { IMask, ReactMaskOpts, useIMask } from "react-imask";

export const useDateMask = (
  onAccept: (val: string) => void,
  defaultValue?: string, 
) => {
  return useIMask<HTMLInputElement, ReactMaskOpts>(
  {
    mask: "d.`m.`Y",
    lazy: true,
    eager: true,
    overwrite: true,
    blocks: {
      d: { mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2 },
      m: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2 },
      Y: { mask: IMask.MaskedRange, from: 0, to: 9999, maxLength: 4 },
    },
  },
  {
    defaultValue,
    onAccept,
  }
)};