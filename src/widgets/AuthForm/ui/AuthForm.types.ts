import { ReactNode } from 'react';

export interface IAuthFormProps {
  title: string;
  subTitle?: () => ReactNode;
  inputs?: () => ReactNode;
  text?: () => ReactNode;
  link?: () => ReactNode;
  buttonText: string;
  onSubmit?: (e: React.SubmitEvent<HTMLFormElement>) => void;
  className?: string;
};