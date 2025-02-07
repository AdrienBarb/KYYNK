import { NextRequest, NextResponse } from 'next/server';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/lib/utils/errors/errorHandler';
import { errorMessages } from '@/lib/constants/errorMessage';
import { fetchMessagesByConversationId } from '@/services/conversations/fetchMessagesByConversationId';

export const GET = strictlyAuth(async (req: NextRequest, { params }) => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;
    const { id: conversationId } = params;

    if (!conversationId) {
      return NextResponse.json(
        { error: 'Conversation ID is required' },
        { status: 400 },
      );
    }

    const isParticipant = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        participants: {
          some: {
            id: userId,
          },
        },
      },
    });

    if (!isParticipant) {
      return NextResponse.json(
        { error: errorMessages.NOT_AUTHORIZED },
        { status: 404 },
      );
    }

    const messages = await fetchMessagesByConversationId({ conversationId });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
});
