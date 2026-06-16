import { Button } from "@/shared/ui/Button/Button";
import { Text } from "@/shared/ui/Typography/Typography";
import { DeliveryTab } from "../DeliveryTab/DeliveryTab";
import { PickupTab } from "../PickupTab/PickupTab";
import { PaymentBlock } from "../PaymentBlock/PaymentBlock";
import { ByTimeTab } from "../ByTimeTab/ByTimeTab";
import { NearestTab } from "../NearestTab/NearestTab";
import "./DeliveryForm.style.css";
import { useOrderStore } from "@/entities/Order/store/new-order/orderStore";

export function DeliveryForm() {
  const isTimeSaved = useOrderStore((s) => s.time.isTimeSaved);
  const activeDeliveryTab = useOrderStore((s) => s.deliveryType);
  const setActiveDeliveryTab = useOrderStore((s) => s.setDeliveryType);
  const activeTimeTab = useOrderStore((s) => s.timeMode);
  const setActiveTimeTab = useOrderStore((s) => s.setTimeMode);

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
              activeTimeTab={activeTimeTab} 
              setActiveTimeTab={setActiveTimeTab}
            />
          )}

          {activeDeliveryTab==="pickup" && (
            <PickupTab 
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

            {activeTimeTab==="by-time" && <ByTimeTab/>}
          </div>
        </div>
      </div>
      {activeDeliveryTab==="delivery" && (
        <PaymentBlock 
          activeTimeTab={activeTimeTab} 
          isTimeSaved={isTimeSaved}
        />
      )}
    </div>
  );
}