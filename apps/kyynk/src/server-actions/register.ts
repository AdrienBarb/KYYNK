'use server';

import { signIn } from '@/auth';
import { errorMessages } from '@/lib/constants/errorMessage';
import { prisma } from '@/lib/db/client';
import { sendPostHogEvent } from '@/utils/tracking/sendPostHogEvent';
import { checkOrCreateSlug } from '@/utils/users/checkOrCreateSlug';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

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
      return { success: false, error: errorMessages.MISSING_FIELDS };
    }

    const lowerCaseEmail = email.toLowerCase();
    const lowerCasePseudo = pseudo.toLowerCase();

    const userExists = await prisma.user.findUnique({
      where: { email: lowerCaseEmail },
    });

    if (userExists) {
      return { success: false, error: errorMessages.USER_ALREADY_EXIST };
    }

    const pseudoExist = await prisma.user.findFirst({
      where: { pseudo: lowerCasePseudo },
    });

    if (pseudoExist) {
      return { success: false, error: errorMessages.PSEUDO_ALREADY_EXIST };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await prisma.user.create({
      data: {
        pseudo: lowerCasePseudo,
        email: lowerCaseEmail,
        password: hashedPassword,
        slug: await checkOrCreateSlug(lowerCasePseudo),
        settings: {
          create: {},
        },
      },
      select: {
        id: true,
        pseudo: true,
        email: true,
        slug: true,
      },
    });

    sendPostHogEvent({
      distinctId: createdUser.id,
      event: 'user_signed_up',
      properties: {
        email: lowerCaseEmail,
        pseudo: lowerCasePseudo,
        $process_person_profile: false,
      },
    });

    await signIn('credentials', {
      email: lowerCaseEmail,
      password: password,
      redirect: false,
    });

    return { success: true };
  } catch (error: any) {
    if (error instanceof AuthError) {
      return { success: false, error: error?.cause?.err?.message };
    }

    return { success: false, error: errorMessages.FAILED_TO_AUTHENTICATE };
  }
}
