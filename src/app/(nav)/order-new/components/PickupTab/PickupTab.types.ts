export type PickupTabProps = {
  activeTimeTab: "nearest" | "by-time" | null, 
  setActiveTimeTab: (val: "nearest" | "by-time") => void 
};