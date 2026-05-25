export type DeliveryTabProps = {
  activeTimeTab: "nearest" | "by-time" | null;
  setActiveTimeTab: (val: "nearest" | "by-time") => void;
};