export interface IHeaderOrdersProps {
  cities: string[];
  phoneCheck?: 'success' | 'error';

  onSubmit?: (data: {
    city?: string;
    date?: string;
    phone?: string;
    address?: string;
  }) => void;
}