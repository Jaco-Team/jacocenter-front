export interface StopOrderOption {
  label: string;
  description?: string;
}

export interface StopOrderProps {
  options: StopOrderOption[];
  className?: string;
}