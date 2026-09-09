export interface IHeaderOrdersProps {
  cities: Array<{ id: number; name: string }>;
  phoneCheck?: 'success' | 'error';

  onSubmit?: (data: {
    cityId?: number;
    date?: string;
    phone?: string;
    address?: string;
  }) => void;
}