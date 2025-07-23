import { NextRequest, NextResponse } from 'next/server';
import { errorMessages } from '@/lib/constants/errorMessage';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { prisma } from '@/lib/db/client';

export const DELETE = strictlyAuth(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
  ): Promise<NextResponse> => {
    try {
      const { auth } = req;
      const userId = auth?.user.id;
      const { id: profileImageId } = await params;

      if (!profileImageId) {
        return NextResponse.json(
          { error: errorMessages.MISSING_FIELDS },
          { status: 400 },
        );
      }

      const profileImage = await (prisma as any).profileImage.findUnique({
        where: {
          id: profileImageId,
        },
      });

      if (!profileImage || profileImage.userId !== userId) {
        return NextResponse.json(
          { error: errorMessages.NOT_AUTHORIZED },
          { status: 401 },
        );
      }

      await (prisma as any).profileImage.delete({
        where: {
          id: profileImageId,
        },
      });

      return NextResponse.json(
        { message: 'Profile image deleted successfully' },
        { status: 200 },
      );
    } catch (error) {
      return errorHandler(error);
    }
  },
);
