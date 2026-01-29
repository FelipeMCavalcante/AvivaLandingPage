import { supabase } from '@/lib/supabaseClient';

export type ProductType = 'roupa' | 'acessorio' | 'outro';

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

function normalizeProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name ?? '',
    description: row.description ?? '',
    price: Number(row.price ?? 0),
    type: row.type as ProductType,
    images: Array.isArray(row.images) ? row.images : [],
    sizes: Array.isArray(row.sizes) ? row.sizes : null,
    active: Boolean(row.active),
    created_at: row.created_at,
  };
}

export async function listProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('id,name,description,price,type,images,sizes,active,created_at')
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data ?? []).map(normalizeProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('id,name,description,price,type,images,sizes,active,created_at')
    .eq('id', id)
    .single();

  if (error) {
    // se não encontrou, retorna null
    if ((error as any).code === 'PGRST116') return null;
    throw error;
  }

  return data ? normalizeProduct(data) : null;
}
