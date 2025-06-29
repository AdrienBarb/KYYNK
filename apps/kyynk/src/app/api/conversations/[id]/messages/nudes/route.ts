import { NextRequest, NextResponse } from 'next/server';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { prisma } from '@/lib/db/client';
import { errorHandler } from '@/utils/errors/errorHandler';
import { errorMessages } from '@/lib/constants/errorMessage';
import { z } from 'zod';
import { getCreditsWithFiat } from '@/utils/prices/getMediaPrice';
import { privateNudeSchema } from '@/schemas/nudeSchema';

const formSchema = privateNudeSchema.extend({
  mediaId: z.string(),
});

export const POST = strictlyAuth(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
  ): Promise<NextResponse> => {
    try {
      const { auth } = req;
      const userId = auth?.user.id;
      const { id: conversationId } = await params;
      const requestBody = await req.json();

      if (!conversationId) {
        return NextResponse.json(
          { error: errorMessages.MISSING_FIELDS },
          { status: 400 },
        );
      }

      const conversation = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          participants: { some: { id: userId } },
        },
      });

      if (!conversation) {
        return NextResponse.json(
          { error: errorMessages.NOT_AUTHORIZED },
          { status: 400 },
        );
      }

      const payload = formSchema.parse(requestBody);
      const { creditPrice, fiatPrice } = getCreditsWithFiat(payload.price);

      const newNude = await prisma.nude.create({
        data: {
          media: {
            connect: {
              id: payload.mediaId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
          description: payload.description,
          fiatPrice: fiatPrice,
          creditPrice: creditPrice,
          currency: 'EUR',
          isPrivate: true,
        },
      });

      const message = await prisma.message.create({
        data: {
          content: payload.description,
          conversationId,
          senderId: userId!,
          nudeId: newNude.id,
        },
      });

      return NextResponse.json(message, { status: 201 });
    } catch (error) {
      return errorHandler(error);
    }
  },
);
