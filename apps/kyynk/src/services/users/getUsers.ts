import { prisma } from '@/lib/db/client';

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        isArchived: false,
        userType: 'creator',
        isEmailVerified: true,
        identityVerificationStatus: 'verified',
        profileImageId: {
          not: null,
        },
        nudesCount: {
          gt: 0,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        pseudo: true,
        slug: true,
        profileImageId: true,
      },
    });

    return users;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch users');
  }
};
