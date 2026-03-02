export interface ISelectBaseProps {
  value?: string;
  placeholder?: string;
  isOpen?: boolean;
  className?: string;
  options: string[];
  onToggle?: () => void;
  onSelect: (value: string) => void;
}