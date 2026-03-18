import { Text } from "@/shared/ui/Typography/Typography";
import { NotificationProps, NotificationConfig } from "./Notification.types";
import './Notification.style.css';

const withNotification = ({ variant, text }: NotificationConfig) => {
  return function Notification({ zoneName, isOpen, onClose }: NotificationProps) {
    if (!isOpen) return null;

    return (
      <div className={`notification-container ${variant}`}>
        <div className="notification-text">
          <Text variant="heading-l-regular-20">{zoneName}</Text>
          <Text variant="heading-l-regular-20">{text}</Text>
        </div>
        <CloseButton onClick={onClose}/>
      </div>
    );
  };
};

export const CafeStoppedNotification = withNotification({
  variant: "cafe-stopped",
  text: "Внимание! Прием заказов временно приостановлен!",
});

export const CafeAvailableNotification = withNotification({
  variant: "cafe-available",
  text: "Приём заказов возобновлён! Спасибо за ожидание!",
});

const CloseButton = ({onClick}: {onClick: ()=> void}) => (
  <button
    onClick={onClick}
    className="close-button"
  >
    <span className="absolute w-[1.5px] h-[20px] rotate-45  bg-current"/>
    <span className="absolute w-[1.5px] h-[20px] -rotate-45 bg-current"/>
  </button>
);