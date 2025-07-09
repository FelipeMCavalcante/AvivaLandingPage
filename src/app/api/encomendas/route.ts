// app/api/encomendas/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type Order = {
  id: string;
  productId: number;
  productName: string;
  qty: number;
  price: number;
  customerName: string;
  customerPhone: string;
  createdAt: string;
};

const orders: Order[] = []; // ← protótipo em memória

/* ---------- GET ---------- */
export async function GET() {
  return NextResponse.json(orders);
}

/* ---------- POST ---------- */
export async function POST(req: Request) {
  const data = (await req.json()) as Omit<Order, 'id' | 'createdAt'>;

  orders.push({
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}

/* ---------- DELETE – limpa tudo ---------- */
export async function DELETE() {
  orders.length = 0; // esvazia o array
  return NextResponse.json({ ok: true });
}
