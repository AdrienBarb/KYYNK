import { NextRequest, NextResponse } from 'next/server';
import apiVideoClient from '@/lib/api-video/client';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { getCurrentUser } from '@/services/users/getCurrentUser';
import { errorMessages } from '@/lib/constants/errorMessage';
import { prisma } from '@/lib/db/client';

export const GET = strictlyAuth(async (req: NextRequest) => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId! },
      select: { watermarkId: true, pseudo: true, nudesCount: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: errorMessages.USER_NOT_FOUND },
        { status: 400 },
      );
    }

    const tokenResponse = await apiVideoClient.uploadTokens.createToken();

    if (!tokenResponse.token) {
      return NextResponse.json(
        { error: errorMessages.SERVER_ERROR },
        { status: 500 },
      );
    }

    let videoId = null;

    if (user.watermarkId) {
      const watermarkVideo = await apiVideoClient.videos.create({
        title: `${user.pseudo} - video`,
        watermark: {
          id: user.watermarkId,
          bottom: '50px',
          right: '50px',
          width: '1200px',
          height: '200px',
        },
      });

      videoId = watermarkVideo.videoId;
    }

    return NextResponse.json({ uploadToken: tokenResponse.token, videoId });
  } catch (error) {
    console.error('Error generating upload token:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
});
