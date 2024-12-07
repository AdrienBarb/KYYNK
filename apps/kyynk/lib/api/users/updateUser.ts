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
    age: number;
    description: string;
    profileImageId: string;
    gender: string;
    bodyType: string;
    hairColor: string;
    country: string;
    tags: string[];
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

  if (body.description) {
    data.description = body.description;
  }

  if (body.age) {
    data.age = body.age;
  }

  if (body.gender) {
    data.gender = body.gender;
  }

  if (body.bodyType) {
    data.bodyType = body.bodyType;
  }

  if (body.hairColor) {
    data.hairColor = body.hairColor;
  }

  if (body.country) {
    data.country = body.country;
  }

  if (body.tags) {
    data.tags = body.tags;
  }

  if (body.profileImageId) {
    data.profileImageId = body.profileImageId;
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
      description: true,
      profileImageId: true,
      isArchived: true,
      age: true,
      gender: true,
      bodyType: true,
      hairColor: true,
      country: true,
      tags: true,
    },
  });
}
