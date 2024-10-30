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
    const r = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    });
    return r;
  } catch (error) {
    if (error instanceof AuthError) {
      throw new Error(error?.cause?.err?.message);
    } else {
      throw new Error(errorMessages.FAILED_TO_AUTHENTICATE);
    }
  }
}
