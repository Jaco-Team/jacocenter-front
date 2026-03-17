import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DeliveryForm } from "./DeliveryForm";
import { DeliveryState, PickupState, TimeState, PaymentState } from "./DeliveryForm.types";

const meta: Meta<typeof DeliveryForm> = {
  title: "Order-new/DeliveryForm",
  component: DeliveryForm,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    deliveryState: { control: false },
    pickupState: { control: false },
    timeState: { control: false },
    paymentState: { control: false },
    cafeList: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof DeliveryForm>;

export const Default: Story = {
  render: () => {
    const [deliveryState, setDeliveryState] = useState<DeliveryState>({
      address: "",
      building: "",
      entrance: "",
      floor: "",
      apartment: "",
      intercom: null,
      addressCheckStatus: null,
      setAddress: (val) => setDeliveryState((s) => ({ ...s, address: val })),
      setBuilding: (val) => setDeliveryState((s) => ({ ...s, building: val })),
      setEntrance: (val) => setDeliveryState((s) => ({ ...s, entrance: val })),
      setFloor: (val) => setDeliveryState((s) => ({ ...s, floor: val })),
      setApartment: (val) => setDeliveryState((s) => ({ ...s, apartment: val })),
      setIntercom: (val) => setDeliveryState((s) => ({ ...s, intercom: val })),
      setAddressCheckStatus: (val) => setDeliveryState((s) => ({ ...s, addressCheckStatus: val })),
    });

    const [pickupState, setPickupState] = useState<PickupState>({
      cafe: "",
      cafeCheckStatus: null,
      setCafe: (val) => setPickupState((s) => ({ ...s, cafe: val })),
      setCafeCheckStatus: (val) => setPickupState((s) => ({ ...s, cafeCheckStatus: val })),
    });

    const [timeState, setTimeState] = useState<TimeState>({
      date: "",
      time: "",
      isTimeSaved: false,
      setDate: (val) => setTimeState((s) => ({ ...s, date: val })),
      setTime: (val) => setTimeState((s) => ({ ...s, time: val })),
      setIsTimeSaved: (val) => setTimeState((s) => ({ ...s, isTimeSaved: val })),
    });

    const [paymentState, setPaymentState] = useState<PaymentState>({
      method: null,
      cashAmount: "",
      comment: "",
      setMethod: (val) => setPaymentState((s) => ({ ...s, method: val })),
      setCashAmount: (val) => setPaymentState((s) => ({ ...s, cashAmount: val })),
      setComment: (val) => setPaymentState((s) => ({ ...s, comment: val })),
    });

    const cafeList = [
      { id: 1, name: "Ленинградская 47" },
      { id: 2, name: "Ворошилова 12 а" },
      { id: 3, name: "Матросова 32" },
      { id: 4, name: "Цветной 1" },
      { id: 5, name: "Ленинградская 100" },
      { id: 6, name: "Ленинский проспект 5" },
    ];

    return (
      <div style={{ width: 900, padding: 20 }}>
        <DeliveryForm
          deliveryState={deliveryState}
          pickupState={pickupState}
          timeState={timeState}
          paymentState={paymentState}
          cafeList={cafeList}
        />
      </div>
    );
  },
};