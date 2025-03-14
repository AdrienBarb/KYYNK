'use server';
import { signIn } from '@/auth';
import { appRouter } from '@/constants/appRouter';
import { errorMessages } from '@/lib/constants/errorMessage';
import { prisma } from '@/lib/db/client';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect';

export async function authenticate({
  email,
  password,
  previousUrl,
}: {
  email: string;
  password: string;
  previousUrl?: string | null;
}) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { slug: true, userType: true },
    });

    if (!user) {
      throw new Error(errorMessages.FAILED_TO_AUTHENTICATE);
    }

    await signIn('credentials', {
      email: email,
      password: password,
      redirect: true,
      redirectTo: previousUrl
        ? previousUrl
        : user?.userType === 'creator'
        ? `/${user.slug}`
        : appRouter.models,
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
