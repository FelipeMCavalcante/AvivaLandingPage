'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import ProductForm from '../ui/ProductForm';

type ProductType = 'roupa' | 'acessorio' | 'outro';

export type ProductRow = {
  id: string;
  name: string;
  description: string;
  price: number;
  type: ProductType;
  images: string[];
  sizes: string[] | null;
  active: boolean;
};

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [product, setProduct] = useState<ProductRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('id, name, description, price, type, images, sizes, active')
        .eq('id', id)
        .single();

      if (!error) setProduct(data as ProductRow);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <p className="text-gray-600">Carregando...</p>;
  if (!product) return <p className="text-gray-600">Produto não encontrado.</p>;

  return <ProductForm mode="edit" product={product} />;
}
