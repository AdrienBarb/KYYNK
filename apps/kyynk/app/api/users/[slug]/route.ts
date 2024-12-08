import { errorMessages } from '@/lib/constants/errorMessage';
import { errorHandler } from '@/lib/utils/errors/errorHandler';
import { getUserBySlug } from '@/shared/api/services/users/getUserBySlug';
import { NextResponse } from 'next/server';

export const GET = async (
  req: Request,
  context: { params: { slug: string } },
) => {
  try {
    const { slug } = context.params;

    if (!slug || Array.isArray(slug)) {
      return NextResponse.json(
        { error: errorMessages.MISSING_FIELDS },
        { status: 400 },
      );
    }

    const user = await getUserBySlug({ slug });

    if (!user) {
      return NextResponse.json(
        { error: errorMessages.MISSING_FIELDS },
        { status: 404 },
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
