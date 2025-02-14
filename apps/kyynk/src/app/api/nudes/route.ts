export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { prisma } from '@/lib/db/client';
import { nudeSchema } from '@/schemas/nudeSchema';
import { errorHandler } from '@/utils/errors/errorHandler';

const formSchema = nudeSchema.extend({
  mediaId: z.string(),
});

export const POST = strictlyAuth(async (req: NextRequest) => {
  try {
    const { auth } = req;
    const userId = auth?.user.id;

    const body = await req.json();
    const payload = formSchema.parse(body);

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
        fiatPrice: payload.price,
        creditPrice: payload.price * 2,
        tags: payload.tags.map((tag) => tag.value),
        currency: 'EUR',
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { nudesCount: { increment: 1 } },
    });

    return NextResponse.json(newNude, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
});
