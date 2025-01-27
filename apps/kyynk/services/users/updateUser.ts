import { prisma } from '@/lib/db/client';
import { errorMessages } from '@/lib/constants/errorMessage';
import { checkOrCreateSlug } from '@/lib/helpers/user/checkOrCreateSlug';
import { Prisma, User } from '@prisma/client';
import { z } from 'zod';
import { updateUserSchema } from '@/schemas/users/updateUserSchema';

export async function updateUser({
  userId,
  body,
}: {
  userId: string;
  body: z.infer<typeof updateUserSchema>;
}): Promise<Partial<User>> {
  const validatedBody = updateUserSchema.parse(body);

  const data: Prisma.UserUpdateInput = {};

  if (validatedBody.pseudo) {
    const existingUser = await prisma.user.findUnique({
      where: { pseudo: validatedBody.pseudo },
    });

    if (existingUser && existingUser.id !== userId) {
      throw new Error(errorMessages.PSEUDO_ALREADY_EXIST);
    }

    data.pseudo = validatedBody.pseudo;
    data.slug = await checkOrCreateSlug(validatedBody.pseudo);
  }

  if (validatedBody.email) {
    data.email = validatedBody.email;
  }

  if (validatedBody.userType) {
    data.userType = validatedBody.userType;
  }

  if (validatedBody.preferences) {
    data.preferences = validatedBody.preferences;
  }

  if (validatedBody.description) {
    data.description = validatedBody.description;
  }

  if (validatedBody.age) {
    data.age = validatedBody.age;
  }

  if (validatedBody.gender) {
    data.gender = validatedBody.gender;
  }

  if (validatedBody.bodyType) {
    data.bodyType = validatedBody.bodyType;
  }

  if (validatedBody.hairColor) {
    data.hairColor = validatedBody.hairColor;
  }

  if (validatedBody.country) {
    data.country = validatedBody.country;
  }

  if (validatedBody.tags) {
    data.tags = validatedBody.tags;
  }

  if (validatedBody.profileImageId) {
    data.profileImageId = validatedBody.profileImageId;
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
