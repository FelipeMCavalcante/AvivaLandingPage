export type ProductType = 'roupa' | 'acessorio' | 'outro';

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  size?: string | null;
  type?: ProductType;
  images?: string[];
};

export type Order = {
  id: string;
  created_at: string;
  total: number;
  status: string;
  customer_name: string;
  customer_phone: string | null;
  items: OrderItem[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  type: ProductType;
  images: string[];
  sizes: string[] | null;
  active: boolean;
  created_at: string;
};
