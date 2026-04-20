export type PickupTabProps = {
  options: { id: number; name: string }[], 
  activeTimeTab: "nearest" | "by-time" | null, 
  setActiveTimeTab: (val: "nearest" | "by-time") => void 
};