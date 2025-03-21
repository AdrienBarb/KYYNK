import { prisma } from '@/lib/db/client';
import { NextResponse } from 'next/server';
import { withAdminSecret } from '@/hoc/api/withAdminSecret';
import { errorHandler } from '@/utils/errors/errorHandler';

export const GET = withAdminSecret(async (request: Request) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        identityVerificationStatus: 'pending',
        userType: 'creator',
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return errorHandler(error);
  }
});

export const OPTIONS = () => {
  return NextResponse.json(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'X-ADMIN-SECRET-KEY, Content-Type',
    },
  });
};
