export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import { errorMessages } from '@/lib/constants/errorMessage';
import { fetchMessagesByConversationId } from '@/services/conversations/fetchMessagesByConversationId';
import { messageSchema } from '@/schemas/conversations/messageSchema';

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

    await prisma.message.updateMany({
      where: {
        conversationId,
        status: 'sent',
        senderId: {
          not: userId,
        },
      },
      data: {
        status: 'read',
      },
    });

    const messages = await fetchMessagesByConversationId({ conversationId });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
});

export const POST = strictlyAuth(async (req: NextRequest, { params }) => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;
    const { id: conversationId } = params;
    const requestBody = await req.json();

    if (!conversationId) {
      return NextResponse.json(
        { error: errorMessages.MISSING_FIELDS },
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

    const content = messageSchema.parse(requestBody.content);

    const message = await prisma.message.create({
      data: {
        content,
        conversationId,
        senderId: userId!,
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
});
