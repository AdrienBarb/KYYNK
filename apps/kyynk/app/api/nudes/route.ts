import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { prisma } from '@/lib/db/client';
import { createNudeSchema } from '@/schemas/nudeSchema';
import { errorHandler } from '@/lib/utils/errors/errorHandler';

const formSchema = createNudeSchema.extend({
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
        currency: 'USD',
      },
    });

    return NextResponse.json(newNude, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
});
