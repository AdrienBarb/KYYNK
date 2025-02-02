import { prisma } from '@/lib/db/client';

export const getNudeById = async ({ nudeId }: { nudeId: string }) => {
  try {
    const nude = await prisma.nude.findUnique({
      where: { id: nudeId },
      include: {
        user: true,
      },
    });

    return nude;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch nude by id');
  }
};
