export interface IHeaderOrdersProps {
  cities: string[];
  phoneCheck?: 'success' | 'error';

  onSubmit?: (data: {
    city?: string;
    date?: Date;
    phone?: string;
    address?: string;
  }) => void;
}