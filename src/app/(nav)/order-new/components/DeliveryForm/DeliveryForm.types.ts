import { TimeState } from "../ByTimeTab/ByTimeTab.types";
import { DeliveryState } from "../DeliveryTab/DeliveryTab.types";
import { PaymentState } from "../PaymentBlock/PaymentBlock.types";
import { PickupState } from "../PickupTab/PickupTab.types";
export interface DeliveryFormProps {
  deliveryState: DeliveryState;
  pickupState: PickupState;
  timeState: TimeState;
  paymentState: PaymentState;
  cafeList: { id: number; name: string }[];
}