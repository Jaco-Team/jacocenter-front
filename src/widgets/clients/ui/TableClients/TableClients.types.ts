export interface Client {
  name: string;
  phone: string;
  address: string;
}

export interface TableClientsProps {
  searchPhone?: string;
}