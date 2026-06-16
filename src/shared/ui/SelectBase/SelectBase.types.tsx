import { ReactNode } from "react";

export interface ISelectBaseProps {
  value?: ReactNode;
  placeholder?: string;
  isOpen?: boolean;
  className?: string;

  icon?: ReactNode;
  rotateIcon?: boolean;
  dropdownClassName?: string;
  children?: ReactNode;

  onToggle?: () => void;
}