import { errorMessages } from '@/lib/constants/errorMessage';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { getCurrentUser } from '@/services/users/getCurrentUser';
import { updateUser } from '@/services/users/updateUser';
import { NextResponse, NextRequest } from 'next/server';
import { createWatermark } from '@/utils/users/createWatermark';
import { updateUserSchema } from '@/schemas/users/updateUserSchema';
import { sendPostHogEvent } from '@/utils/tracking/sendPostHogEvent';
import { CREATOR_AUDIENCE_ID } from '@/constants/resend/audiences';
import { createMarketingContact } from '@/utils/emailing/createMarketingContact';

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

    if (validatedBody.userType === 'creator') {
      // Send POSTHOG event
      sendPostHogEvent({
        distinctId: userId!,
        event: 'user_become_creator',
        properties: {
          $process_person_profile: false,
        },
      });

      // Add to RESEND creators audience
      await createMarketingContact(user.email!, CREATOR_AUDIENCE_ID);
    }

    if (
      validatedBody.userType === 'creator' ||
      currentUser.userType === 'creator'
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
