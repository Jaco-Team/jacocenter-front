import { InputProps } from '../Input/Input.types';

export interface IPasswordInputUIProps extends Omit<InputProps, 'type'> {
  iconSrc?: string;
}