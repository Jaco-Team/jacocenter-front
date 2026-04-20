import { useState } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { Text } from "@/shared/ui/Typography/Typography";
import { DeliveryFormProps } from "./DeliveryForm.types";
import { DeliveryTab } from "../DeliveryTab/DeliveryTab";
import { PickupTab } from "../PickupTab/PickupTab";
import { PaymentBlock } from "../PaymentBlock/PaymentBlock";
import { ByTimeTab } from "../ByTimeTab/ByTimeTab";
import { NearestTab } from "../NearestTab/NearestTab";
import "./DeliveryForm.style.css";

export function DeliveryForm({ 
  deliveryState, 
  pickupState, 
  timeState, 
  paymentState, 
  cafeList 
}: DeliveryFormProps) {
  const [activeDeliveryTab, setActiveDeliveryTab] = useState<"delivery" | "pickup">("delivery");
  const [activeTimeTab, setActiveTimeTab] = useState<"nearest" | "by-time" | null>(null);

  return (
    <div className="delivery-form">
      <div className="delivery-form-main">
        <div className="delivery-form-column">
          <div className="tabs-container">
            <Button
              variant="text" 
              theme="primary"
              className={`delivery-tab delivery-tab-default
              ${activeDeliveryTab === "delivery" ? (activeTimeTab === null ? "delivery-tab-active" : "delivery-tab-active-muted") : ""}`} 
              onClick={() => setActiveDeliveryTab("delivery")}
            >
              <Text>Доставка</Text>
            </Button>
            <Button 
              variant="text" 
              theme="primary"
              className={`delivery-tab delivery-tab-default
              ${activeDeliveryTab === "pickup" ? (activeTimeTab === null ? "delivery-tab-active" : "delivery-tab-active-muted") : ""}`} 
              onClick={() => setActiveDeliveryTab("pickup")}
            >
              <Text>Самовывоз</Text>
            </Button>
          </div>

          {activeDeliveryTab==="delivery" && (
            <DeliveryTab 
              state={deliveryState} 
              activeTimeTab={activeTimeTab} 
              setActiveTimeTab={setActiveTimeTab}
            />
          )}

          {activeDeliveryTab==="pickup" && (
            <PickupTab 
              state={pickupState} 
              options={cafeList} 
              activeTimeTab={activeTimeTab} 
              setActiveTimeTab={setActiveTimeTab}
            />
          )}
        </div>
        <div className="delivery-form-column">
          <div className="tabs-container">
            <Button 
              variant="text" 
              theme="primary"
              className={`delivery-tab delivery-tab-default ${activeTimeTab === "nearest" ? "delivery-tab-active" : ""}`} 
              onClick={() => setActiveTimeTab("nearest")}
            >
              <Text>Ближайшее</Text>
            </Button>
            <Button 
              variant="text" 
              theme="primary"
              className={`delivery-tab delivery-tab-default ${activeTimeTab === "by-time" ? "delivery-tab-active" : ""}`} 
              onClick={() => setActiveTimeTab("by-time")}
              >
              <Text>Ко времени</Text>
            </Button>
          </div>
          <div>
            {activeTimeTab!=="by-time" && (
              <NearestTab 
                activeTimeTab={activeTimeTab} 
                activeDeliveryTab={activeDeliveryTab} 
              />
            )}

            {activeTimeTab==="by-time" && <ByTimeTab timeState={timeState}/>}
          </div>
        </div>
      </div>
      {activeDeliveryTab==="delivery" && (
        <PaymentBlock 
          state={paymentState} 
          activeTimeTab={activeTimeTab} 
          isTimeSaved={timeState.isTimeSaved}
        />
      )}
    </div>
  );
}