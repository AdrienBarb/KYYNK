import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { getUserSales } from '@/services/sales/getUserSales';
import { errorMessages } from '@/lib/constants/errorMessage';
import { getFiatWithCredits } from '@/utils/prices/getMediaPrice';
import { MIN_CREDITS_AMOUNT_FOR_WITHDRAWAL } from '@/constants/constants';

export const POST = strictlyAuth(async (req: NextRequest) => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;

    const sales = await getUserSales({ userId: userId! });

    if (sales.length === 0) {
      return NextResponse.json(
        { message: errorMessages.NO_UNPAID_SALES },
        { status: 400 },
      );
    }

    const totalAmount = sales.reduce(
      (sum: number, sale: { creditAmount: number }) => sum + sale.creditAmount,
      0,
    );

    if (totalAmount < MIN_CREDITS_AMOUNT_FOR_WITHDRAWAL) {
      return NextResponse.json(
        { message: errorMessages.INSUFFICIENT_CREDITS },
        { status: 400 },
      );
    }

    const saleIds = sales.map((sale) => sale.id);

    await prisma.sale.updateMany({
      where: { id: { in: saleIds } },
      data: { isPaid: true },
    });

    const { fiatPrice } = getFiatWithCredits(totalAmount);

    await prisma.invoice.create({
      data: {
        userId: userId!,
        fiatAmount: fiatPrice,
        sales: {
          connect: saleIds.map((id) => ({ id })),
        },
      },
    });

    return NextResponse.json({ message: 'OK' });
  } catch (error) {
    return errorHandler(error);
  }
});
