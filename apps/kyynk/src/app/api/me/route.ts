import { errorMessages } from '@/lib/constants/errorMessage';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { getCurrentUser } from '@/services/users/getCurrentUser';
import { updateUser } from '@/services/users/updateUser';
import { NextResponse, NextRequest } from 'next/server';
import { createWatermark } from '@/utils/users/createWatermark';
import { updateUserSchema } from '@/schemas/users/updateUserSchema';
import { UserType } from '@prisma/client';

export const PUT = strictlyAuth(async (req: NextRequest) => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;

    const currentUser = await getCurrentUser({ userId: userId! });

    if (!currentUser) {
      return NextResponse.json(
        { error: errorMessages.USER_NOT_FOUND },
        { status: 400 },
      );
    }

    const body = await req.json();
    const validatedBody = updateUserSchema.parse(body);

    const user = await updateUser({ userId: userId!, body: validatedBody });

    if (
      validatedBody.userType === UserType.creator ||
      currentUser.userType === UserType.creator
    ) {
      // Create watermark only for creator
      await createWatermark({ userId: userId!, slug: user.slug! });
    }

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
