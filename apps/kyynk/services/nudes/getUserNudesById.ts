import { prisma } from '@/lib/db/client';
import { getNudeSelectFields } from '@/utils/nudes/getNudeSelectFields';

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
      select: getNudeSelectFields(),
    });

    return nudes;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch nudes for user');
  }
};
