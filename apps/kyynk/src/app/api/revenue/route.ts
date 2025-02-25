import { strictlyAuth } from '@/hoc/strictlyAuth';
import { NextResponse } from 'next/server';

import { isBefore } from 'date-fns';
import { Sale } from '@prisma/client';
import { prisma } from '@/lib/db/client';
import { getUserSales } from '@/services/sales/getUserSales';

export const GET = strictlyAuth(async (req) => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;

    if (!userId) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 },
      );
    }

    const sales: Sale[] = await getUserSales(userId);
    const today = new Date();

    const incomingRevenue = sales
      .filter(
        (sale: Sale) => !sale.isPaid && isBefore(today, sale.availableDate),
      )
      .reduce((acc: number, sale: Sale) => acc + sale.creditAmount, 0);

    const availableRevenue = sales
      .filter(
        (sale: Sale) => sale.isPaid || !isBefore(today, sale.availableDate),
      )
      .reduce((acc: number, sale: Sale) => acc + sale.creditAmount, 0);

    return NextResponse.json(
      { incomingRevenue, availableRevenue },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch revenue data' },
      { status: 500 },
    );
  }
});
