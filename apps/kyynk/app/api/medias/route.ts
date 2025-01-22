import { NextRequest, NextResponse } from 'next/server';
import { errorMessages } from '@/lib/constants/errorMessage';
import { errorHandler } from '@/lib/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { prisma } from '@/lib/db/client';

export const POST = strictlyAuth(async (req: NextRequest) => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;

    const body = await req.json();
    const { videoId } = body;

    if (!videoId) {
      return NextResponse.json(
        { error: errorMessages.MISSING_FIELDS },
        { status: 400 },
      );
    }

    const newMedia = await prisma.media.create({
      data: {
        videoId,
        userId,
      },
    });

    return NextResponse.json(newMedia, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
});

export const GET = strictlyAuth(async (req: NextRequest) => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;

    const userMedias = await prisma.media.findMany({
      where: {
        userId,
        isArchived: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(userMedias, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
});
