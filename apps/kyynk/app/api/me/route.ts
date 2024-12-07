import { getCurrentUser } from '@/lib/api/users/getCurrentUser';
import { updateUser } from '@/lib/api/users/updateUser';
import { errorMessages } from '@/lib/constants/errorMessage';
import { strictlyAuth } from '@/lib/hoc/api/auth/strictlyAuth';
import { errorHandler } from '@/lib/utils/errors/errorHandler';
import { NextResponse, NextRequest } from 'next/server';

export const PUT = strictlyAuth(async (req: NextRequest) => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;

    if (!userId) {
      return NextResponse.json(
        { error: errorMessages.MISSING_FIELDS },
        { status: 400 },
      );
    }

    const body = await req.json();

    const user = await updateUser({ userId, body });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
});

export const GET = strictlyAuth(async (req: NextRequest) => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;

    if (!userId) {
      return NextResponse.json(
        { error: errorMessages.MISSING_FIELDS },
        { status: 400 },
      );
    }

    const user = await getCurrentUser({ userId });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
});
