import { prisma } from '@/lib/db/client';
import { errorMessages } from '@/lib/constants/errorMessage';
import { Prisma } from '@prisma/client';
import { checkOrCreateSlug } from '@/lib/helpers/user/checkOrCreateSlug';

export async function updateUser({
  userId,
  body,
}: {
  userId: string;
  body: {
    pseudo: string;
    email: string;
    userType: 'member' | 'creator';
    preferences: string[];
  };
}) {
  const data: Prisma.UserUpdateInput = {};

  if (body.pseudo) {
    const existingUser = await prisma.user.findUnique({
      where: { pseudo: body.pseudo },
    });

    if (existingUser && existingUser.id !== userId) {
      throw new Error(errorMessages.PSEUDO_ALREADY_EXIST);
    }

    data.pseudo = body.pseudo;
    data.slug = await checkOrCreateSlug(body.pseudo);
  }

  if (body.email) {
    data.email = body.email;
  }

  if (body.userType) {
    data.userType = body.userType;
  }

  if (body.preferences) {
    data.preferences = body.preferences;
  }

  return prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      pseudo: true,
      email: true,
      userType: true,
      slug: true,
    },
  });
}
