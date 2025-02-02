import { prisma } from '@/lib/db/client';

export const getUserNudesById = async ({ userId }: { userId: string }) => {
  try {
    const nudes = await prisma.nude.findMany({
      where: {
        userId,
        isArchived: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        description: true,
        creditPrice: true,
        createdAt: true,
        userId: true,
        media: {
          select: {
            id: true,
            thumbnailId: true,
            videoId: true,
          },
        },
        user: {
          select: {
            id: true,
            pseudo: true,
            profileImageId: true,
          },
        },
      },
    });

    return nudes;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch nudes for user');
  }
};
