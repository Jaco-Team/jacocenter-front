import { Text } from "@/shared/ui/Typography/Typography"
import { orderStatus } from "../../utils/constants"
import { StatusTagProps } from "./StatusTag.types";

export const StatusTag = ({ status, variant="orderStatus" }: StatusTagProps) => {
  const { label, bg, border, color } = orderStatus[status];
  const width = variant === "orderType" ? "w-[84px]" : "w-[74px]";

  return (
    <div className={`h-[24px] rounded-xl flex items-center justify-center border ${width} ${bg} ${border} ${color}`}>
      <Text variant="label-s-regular-12">{label}</Text>
    </div>
  )
}