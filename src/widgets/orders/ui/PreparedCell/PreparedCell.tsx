import { Text } from "@/shared/ui/Typography/Typography";
import { orderStatus } from "@/widgets/orders/utils/constants";

export type PreparedCellData = {
  status: keyof typeof orderStatus;
  timeToOverdue: string;
  promisedAt: string;
};

type PreparedCellProps = {
  order: PreparedCellData;
};

const parseMinutesLeft = (timeToOverdue: string) => {
  const parts = timeToOverdue.split(":").map(Number);
  if (parts.length === 3) return parts[0] * 60 + parts[1];
  if (parts.length === 2) return parts[0];
  return Number(timeToOverdue) || 0;
};

export const PreparedCell = ({ order }: PreparedCellProps) => {
  if (
    order.status === "inQueue" ||
    order.status === "cancel" ||
    order.timeToOverdue === "—"
  ) {
    return <Text variant="label-s-regular-12">—</Text>;
  }

  const minutes = parseMinutesLeft(order.timeToOverdue);
  const isReady = order.status === "ready" || order.status === "completed";
  const isUrgent = !isReady && minutes < 15;

  return (
    <div className="flex flex-col items-center leading-tight">
      <Text
        variant="label-s-semibold-12"
        className={
          isReady ? "text-primary" : isUrgent ? "text-error" : "text-[#F28C28]"
        }
      >
        {minutes}
      </Text>
      <Text variant="label-s-regular-12" className="text-text-secondary">
        {order.promisedAt}
      </Text>
    </div>
  );
};
