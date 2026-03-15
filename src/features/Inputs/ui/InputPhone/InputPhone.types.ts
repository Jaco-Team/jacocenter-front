import { InputProps } from '../../../../shared/ui/Input/Input.types';

export interface IInputPhoneUIProps extends Omit<InputProps, 'type' | 'onChange'> {
  withSearchIcon?: boolean;
  searchIconSrc?: string;
  onChange?: (phone: string) => void;
}