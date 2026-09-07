import Image from "next/image";
import {
  ORDER_TYPE_BORDER,
  ORDER_TYPE_ICONS,
  OrderTypeKey,
  orderStatus,
} from "@/widgets/orders/utils/constants";

type OrderTypeIconProps = {
  type: keyof typeof orderStatus;
};

export const OrderTypeIcon = ({ type }: OrderTypeIconProps) => {
  if (!(type in ORDER_TYPE_ICONS)) return null;

  const orderType = type as OrderTypeKey;

  return (
    <div
      className={`flex h-9 w-9 items-center justify-center rounded-lg border bg-base ${ORDER_TYPE_BORDER[orderType]}`}
    >
      <Image src={ORDER_TYPE_ICONS[orderType]} alt={orderStatus[type].label} width={20} height={20} />
    </div>
  );
};
