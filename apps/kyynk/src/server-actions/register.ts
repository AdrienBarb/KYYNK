'use server';

import { signIn } from '@/auth';
import { errorMessages } from '@/lib/constants/errorMessage';
import { prisma } from '@/lib/db/client';
import { checkOrCreateSlug } from '@/utils/users/checkOrCreateSlug';
import bcrypt from 'bcryptjs';

export async function register({
  pseudo,
  email,
  password,
}: {
  pseudo: string;
  email: string;
  password: string;
}) {
  try {
    if (!pseudo || !email || !password) {
      throw new Error(errorMessages.MISSING_FIELDS);
    }

    const lowerCaseEmail = email.toLowerCase();

    const userExists = await prisma.user.findUnique({
      where: { email: lowerCaseEmail },
    });

    if (userExists) {
      throw new Error(errorMessages.USER_ALREADY_EXIST);
    }

    const pseudoExist = await prisma.user.findFirst({
      where: { pseudo: pseudo },
    });

    if (pseudoExist) {
      throw new Error(errorMessages.PSEUDO_ALREADY_EXIST);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await prisma.user.create({
      data: {
        pseudo: pseudo,
        email: lowerCaseEmail,
        password: hashedPassword,
        slug: await checkOrCreateSlug(pseudo),
      },
      select: {
        id: true,
        pseudo: true,
        email: true,
        slug: true,
      },
    });

    await signIn('credentials', {
      email: lowerCaseEmail,
      password: password,
      redirect: false,
    });

    return createdUser;
  } catch (error: any) {
    throw new Error(error.message || errorMessages.FAILED_TO_AUTHENTICATE);
  }
}
