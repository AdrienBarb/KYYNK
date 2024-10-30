import { errorMessages } from '@/lib/constants/errorMessage';
import { NextResponse } from 'next/server';

export function errorHandler(error: unknown) {
  console.error(error);
  const errorMessage =
    error instanceof Error && error.message
      ? error.message
      : errorMessages.SERVER_ERROR;

  return NextResponse.json({ error: errorMessage }, { status: 500 });
}
