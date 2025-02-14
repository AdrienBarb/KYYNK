export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import { getUserConversations } from '@/services/conversations/getUserConversations';
import { errorMessages } from '@/lib/constants/errorMessage';

const conversationSchema = z.object({
  slug: z.string(),
});

export const POST = strictlyAuth(async (req: NextRequest) => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;

    const body = await req.json();
    const payload = conversationSchema.parse(body);

    const userToTalkWith = await prisma.user.findUnique({
      where: { slug: payload.slug },
      select: { id: true },
    });

    if (!userToTalkWith) {
      return NextResponse.json(
        { error: errorMessages.USER_NOT_FOUND },
        { status: 404 },
      );
    }

    const existingConversation = await prisma.conversation.findFirst({
      where: {
        participants: {
          every: {
            id: { in: [userId!, userToTalkWith.id] },
          },
        },
      },
    });

    if (existingConversation) {
      return NextResponse.json(existingConversation, { status: 200 });
    }

    const newConversation = await prisma.conversation.create({
      data: {
        participants: {
          connect: [{ id: userId }, { id: userToTalkWith.id }],
        },
      },
    });

    return NextResponse.json(newConversation, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
});

export const GET = strictlyAuth(async (req: NextRequest) => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;

    const conversations = await getUserConversations({ userId: userId! });

    return NextResponse.json(conversations, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
});
