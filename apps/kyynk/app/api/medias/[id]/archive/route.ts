import { NextRequest, NextResponse } from 'next/server';
import { errorMessages } from '@/lib/constants/errorMessage';
import { errorHandler } from '@/lib/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { prisma } from '@/lib/db/client';

export const PUT = strictlyAuth(async (req: NextRequest, { params }) => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;
    const mediaId = params.id;

    if (!mediaId) {
      return NextResponse.json(
        { error: errorMessages.MISSING_FIELDS },
        { status: 400 },
      );
    }

    const media = await prisma.media.findUnique({
      where: {
        id: mediaId,
      },
    });

    if (!media || media.userId !== userId) {
      return NextResponse.json(
        { error: errorMessages.NOT_AUTHORIZED },
        { status: 403 },
      );
    }

    const archivedMedia = await prisma.media.update({
      where: {
        id: mediaId,
      },
      data: {
        isArchived: true,
      },
    });

    return NextResponse.json(archivedMedia, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
});
