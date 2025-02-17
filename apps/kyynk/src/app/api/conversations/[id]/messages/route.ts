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

    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { creditsAmount: true },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: errorMessages.USER_NOT_FOUND },
        { status: 404 },
      );
    }

    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        participants: { some: { id: userId } },
      },
      include: {
        participants: {
          select: {
            id: true,
            settings: { select: { creditMessage: true } },
          },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json(
        { error: errorMessages.NOT_AUTHORIZED },
        { status: 400 },
      );
    }

    const recipient = conversation.participants.find(
      (participant) => participant.id !== userId,
    );

    if (!recipient) {
      return NextResponse.json(
        { error: errorMessages.USER_NOT_FOUND },
        { status: 404 },
      );
    }

    const requiredCredits = recipient?.settings?.creditMessage || 0;
    if (requiredCredits > 0 && currentUser.creditsAmount < requiredCredits) {
      return NextResponse.json(
        { error: errorMessages.NOT_AUTHORIZED },
        { status: 400 },
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

    if (requiredCredits > 0) {
      await prisma.$transaction([
        prisma.sale.create({
          data: {
            creditAmount: requiredCredits,
            type: 'message',
            seller: { connect: { id: recipient.id } },
            buyer: { connect: { id: userId } },
          },
        }),
        prisma.user.update({
          where: { id: userId },
          data: { creditsAmount: { decrement: requiredCredits } },
        }),
      ]);
    }

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
});
