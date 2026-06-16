import { orderStatus } from "../../utils/constants";

export type StatusTagProps = {
  status: keyof typeof orderStatus,
  variant?: "orderStatus" | "orderType",
}