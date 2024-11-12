'use server';
import { signIn } from '@/auth';
import { errorMessages } from '@/lib/constants/errorMessage';
import { prisma } from '@/lib/db/client';
import { AuthError } from 'next-auth';

export async function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    });

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        slug: true,
      },
    });

    return user;
  } catch (error) {
    if (error instanceof AuthError) {
      throw new Error(error?.cause?.err?.message);
    } else {
      throw new Error(errorMessages.FAILED_TO_AUTHENTICATE);
    }
  }
}
