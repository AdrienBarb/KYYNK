import { errorMessages } from '@/lib/constants/errorMessage';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { NextResponse, NextRequest } from 'next/server';

export const POST = strictlyAuth(async (req: NextRequest) => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json(
        { message: errorMessages.MISSING_FIELDS },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: errorMessages.USER_NOT_FOUND },
        { status: 400 },
      );
    }

    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        userId: userId,
        code: code,
      },
    });

    if (!verificationCode) {
      return NextResponse.json(
        { message: errorMessages.INVALID_CODE },
        { status: 400 },
      );
    }

    await prisma.$transaction(async (prisma) => {
      await prisma.user.update({
        where: { id: userId },
        data: { isEmailVerified: true },
      });

      await prisma.verificationCode.delete({
        where: { id: verificationCode.id },
      });
    });

    return NextResponse.json({ emailVerified: true }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
});
