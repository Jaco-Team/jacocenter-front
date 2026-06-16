import React from "react";

export interface ModalProps {
  title: string | React.ReactNode;
  isAccent?: boolean;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
