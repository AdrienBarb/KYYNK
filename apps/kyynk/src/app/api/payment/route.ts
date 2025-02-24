import { strictlyAuth } from '@/hoc/strictlyAuth';
import { NextResponse, NextRequest } from 'next/server';
import { getCurrentUser } from '@/services/users/getCurrentUser';
import { updateUser } from '@/services/users/updateUser';
import { creditPackages } from '@/constants/creditPackages';
import { errorHandler } from '@/utils/errors/errorHandler';
import { errorMessages } from '@/lib/constants/errorMessage';
import { prisma } from '@/lib/db/client';

export const POST = strictlyAuth(async (req: NextRequest) => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;

    const body = await req.json();
    const { packageId } = body;

    const selectedPackage = creditPackages.find((pkg) => pkg.id === packageId);
    if (!selectedPackage) {
      return NextResponse.json(
        { error: errorMessages.INVALID_PACKAGE },
        { status: 400 },
      );
    }

    await prisma.user.update({
      where: { id: userId },
      data: { creditsAmount: { increment: selectedPackage.coinsAmount } },
    });

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
});
