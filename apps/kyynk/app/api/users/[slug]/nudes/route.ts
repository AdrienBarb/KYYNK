import { NextRequest, NextResponse } from 'next/server';
import { errorMessages } from '@/lib/constants/errorMessage';
import { errorHandler } from '@/lib/utils/errors/errorHandler';
import { prisma } from '@/lib/db/client';
import { getUserNudesById } from '@/services/nudes/getUserNudesById';
import { addPermissionsToNudes } from '@/utils/nudes/addPermissionsToNudes';
import { auth } from '@/auth';
import { NudeType } from '@/types/nudes';

export const GET = async (
  req: NextRequest,
  context: { params: { slug: string } },
) => {
  try {
    const session = await auth();
    const { slug } = context.params;

    if (!slug || Array.isArray(slug)) {
      return NextResponse.json(
        { error: errorMessages.MISSING_FIELDS },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: errorMessages.USER_NOT_FOUND },
        { status: 404 },
      );
    }

    const nudes = (await getUserNudesById({ userId: user.id })) as NudeType[];
    const nudesWithPermissions = addPermissionsToNudes(nudes, session?.user.id);

    return NextResponse.json(nudesWithPermissions, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
