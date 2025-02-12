'use server';
import { signIn } from '@/auth';
import { errorMessages } from '@/lib/constants/errorMessage';
import { prisma } from '@/lib/db/client';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect';

export async function authenticate({
  email,
  password,
  previousPath,
}: {
  email: string;
  password: string;
  previousPath?: string | null;
}) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { slug: true },
    });

    if (!user) {
      throw new Error(errorMessages.FAILED_TO_AUTHENTICATE);
    }

    await signIn('credentials', {
      email: email,
      password: password,
      redirect: true,
      redirectTo: previousPath ? previousPath : `/${user.slug}`,
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      throw new Error(error?.cause?.err?.message);
    } else {
      throw new Error(errorMessages.FAILED_TO_AUTHENTICATE);
    }
  }
}
