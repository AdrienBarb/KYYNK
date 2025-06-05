import { errorHandler } from '@/utils/errors/errorHandler';
import { getUsers } from '@/services/users/getUsers';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const users = await getUsers();

    console.log('🚀 ~ GET ~ users:', users);

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
};
