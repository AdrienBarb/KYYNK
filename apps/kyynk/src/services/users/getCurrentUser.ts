import { prisma } from '@/lib/db/client';

export const getCurrentUser = async ({ userId }: { userId: string }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        pseudo: true,
        slug: true,
        userType: true,
        description: true,
        profileImageId: true,
        isArchived: true,
        age: true,
        gender: true,
        bodyType: true,
        hairColor: true,
        country: true,
        tags: true,
        creditsAmount: true,
        isEmailVerified: true,
        identityVerificationStatus: true,
        nudesCount: true,
        watermarkId: true,
        contentProviderPolicyAccepted: true,
        settings: {
          select: {
            fiatMessage: true,
            creditMessage: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
