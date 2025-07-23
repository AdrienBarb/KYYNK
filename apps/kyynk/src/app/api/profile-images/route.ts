import { NextRequest, NextResponse } from 'next/server';
import { errorMessages } from '@/lib/constants/errorMessage';
import { errorHandler } from '@/utils/errors/errorHandler';
import { strictlyAuth } from '@/hoc/strictlyAuth';
import { prisma } from '@/lib/db/client';
import { z } from 'zod';

const createProfileImageSchema = z.object({
  imageId: z.string().min(1, 'Image ID is required'),
});

export const POST = strictlyAuth(
  async (req: NextRequest): Promise<NextResponse> => {
    try {
      const { auth } = req;
      const userId = auth?.user.id;

      if (!userId) {
        return NextResponse.json(
          { error: errorMessages.MISSING_FIELDS },
          { status: 400 },
        );
      }

      const body = await req.json();
      const validatedBody = createProfileImageSchema.parse(body);

      const newProfileImage = await (prisma as any).profileImage.create({
        data: {
          imageId: validatedBody.imageId,
          userId: userId,
        },
        select: {
          id: true,
          imageId: true,
          createdAt: true,
        },
      });

      return NextResponse.json(newProfileImage, { status: 201 });
    } catch (error) {
      return errorHandler(error);
    }
  },
);
