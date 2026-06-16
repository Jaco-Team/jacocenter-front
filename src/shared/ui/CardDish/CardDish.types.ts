export interface ICardDishProps {
  id:string;
  name: string;
  price: number;
  currency?: string;
  description?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}