'use server';
import { signIn } from '@/auth';
import { errorMessages } from '@/lib/constants/errorMessage';
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

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: error?.cause?.err?.message };
    }

    return { success: false, error: errorMessages.FAILED_TO_AUTHENTICATE };
  }
}
