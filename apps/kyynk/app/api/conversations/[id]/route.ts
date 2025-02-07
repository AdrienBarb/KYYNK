import { NextRequest, NextResponse } from 'next/server';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { errorHandler } from '@/lib/utils/errors/errorHandler';
import { getConversationById } from '@/services/conversations/getConversationById';
import { errorMessages } from '@/lib/constants/errorMessage';

export const GET = strictlyAuth(async (req: NextRequest, { params }) => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;
    const { id: conversationId } = params;

    if (!conversationId) {
      return NextResponse.json(
        { error: errorMessages.MISSING_FIELDS },
        { status: 400 },
      );
    }

    const conversation = await getConversationById({ conversationId });

    if (
      !conversation.participants.some(
        (participant) => participant.id === userId,
      )
    ) {
      return NextResponse.json(
        { error: errorMessages.NOT_AUTHORIZED },
        { status: 403 },
      );
    }

    return NextResponse.json(conversation, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
});
