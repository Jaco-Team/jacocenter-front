import { Text } from "@/shared/ui/Typography/Typography";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { NotificationProps, NotificationConfig } from "./Notification.types";
import './Notification.style.css';
import { useNotificationStore } from "@/entities/notifications/store/Notification/Notification";

const cssClassByVariant = {
  'cafe.stopped': 'cafe-stopped',
  'cafe.available': 'cafe-available',
} as const;

type NotificationFrameProps = {
  children: ReactNode;
  className?: string;
  role?: 'alert' | 'status' | 'region';
  closing?: boolean;
  onClose: () => void;
};

const NotificationFrame = ({ children, className = '', role = 'status', closing = false, onClose }: NotificationFrameProps) => (
  <div className={`notification-frame ${className}${closing ? ' notification-frame--closing' : ''}`} role={role}>
    <div className="notification-frame__content">{children}</div>
    <CloseButton onClick={onClose} />
  </div>
);

const withNotification = ({ variant, text }: NotificationConfig) => {
  return function Notification({ id, zoneName }: NotificationProps) {
    const removeAlert = useNotificationStore((state) => state.removeAlert);
    
    return (
      <NotificationFrame
        className={`notification-container ${cssClassByVariant[variant]}`}
        role="region"
        onClose={() => removeAlert(id)}
      >
        <div className="notification-text">
          <Text variant="heading-l-regular-20">{zoneName}</Text>
          <Text variant="heading-l-regular-20">{text}</Text>
        </div>
      </NotificationFrame>
    );
  };
};

export const CafeStoppedNotification = withNotification({
  variant: "cafe.stopped",
  text: "Внимание! Прием заказов временно приостановлен!",
});

export const CafeAvailableNotification = withNotification({
  variant: "cafe.available",
  text: "Приём заказов возобновлён! Спасибо за ожидание!",
});

const CloseButton = ({onClick}: {onClick: ()=> void}) => (
  <button
    type="button"
    onClick={onClick}
    className="close-button"
    aria-label="Закрыть уведомление"
  >
    <span className="absolute w-[1.5px] h-[20px] rotate-45  bg-current"/>
    <span className="absolute w-[1.5px] h-[20px] -rotate-45 bg-current"/>
  </button>
);

export const FeedbackNotification = ({ id, message, variant }: { id: string; message: string; variant: 'error' | 'success' }) => {
  const removeAlert = useNotificationStore((state) => state.removeAlert);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const dismiss = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    closeTimer.current = window.setTimeout(() => removeAlert(id), 180);
  }, [id, isClosing, removeAlert]);

  useEffect(() => {
    const timeout = window.setTimeout(dismiss, 6000);
    return () => {
      window.clearTimeout(timeout);
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    };
  }, [dismiss]);

  return (
    <NotificationFrame
      className={`feedback-notification feedback-notification--${variant}`}
      role={variant === 'error' ? 'alert' : 'status'}
      closing={isClosing}
      onClose={dismiss}
    >
      <span className="feedback-notification__message">{message}</span>
    </NotificationFrame>
  );
};
