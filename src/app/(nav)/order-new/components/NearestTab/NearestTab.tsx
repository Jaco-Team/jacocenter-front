import { Text } from "@/shared/ui/Typography/Typography";
import "./NearestTab.style.css";

export const NearestTab = ({
  activeTimeTab, 
  activeDeliveryTab
}: {
  activeTimeTab: "nearest" | "by-time" | null, 
  activeDeliveryTab:  "delivery" | "pickup"
}) => {
  const averageTime = activeDeliveryTab === "delivery" ? "1 ч. 25 мин. - 1 ч. 55 мин." : "10 мин. - 15 мин.";

  return (
    <div className={`nearest-time-container ${activeTimeTab === "nearest" ? "nearest-time-active" : "nearest-time-disabled"}`}>
      <Text className="nearest-time-label">Среднее время:</Text>
      <Text variant="body-l-regular-20" className="nearest-time-value">{averageTime}</Text>
    </div>
  );
}