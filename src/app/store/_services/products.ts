import { supabase } from '@/lib/supabaseClient';
import type { Product, ProductType } from '@/app/_types/shop';

type Row = Record<string, unknown>;

function asString(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v : fallback;
}
function asNumber(v: unknown, fallback = 0): number {
  return typeof v === 'number' ? v : Number(v ?? fallback) || fallback;
}
function asBool(v: unknown, fallback = false): boolean {
  return typeof v === 'boolean' ? v : fallback;
}
function asStringArray(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
}

function normalizeProduct(row: Row): Product {
  return {
    id: asString(row.id),
    name: asString(row.name),
    description: asString(row.description),
    price: asNumber(row.price),
    type: (asString(row.type) as ProductType) || 'outro',
    images: asStringArray(row.images),
    sizes: Array.isArray(row.sizes) ? asStringArray(row.sizes) : null,
    active: asBool(row.active, true),
    created_at: asString(row.created_at),
  };
}

export async function listProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('id,name,description,price,type,images,sizes,active,created_at')
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const rows = (data ?? []) as Row[];
  return rows.map(normalizeProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('id,name,description,price,type,images,sizes,active,created_at')
    .eq('id', id)
    .single();

  if (error) {
    // “no rows” no PostgREST costuma vir como PGRST116
    const code = (error as unknown as { code?: string })?.code;
    if (code === 'PGRST116') return null;
    throw error;
  }

  if (!data) return null;
  return normalizeProduct(data as Row);
}

export type { Product };
