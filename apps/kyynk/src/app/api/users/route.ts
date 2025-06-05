import { errorHandler } from '@/utils/errors/errorHandler';
import { getUsers } from '@/services/users/getUsers';
import { noCacheJson } from '@/utils/api/noCacheJson';

export const GET = async (req: Request) => {
  try {
    const users = await getUsers();

    console.log('🚀 ~ GET ~ users:', users);

    return noCacheJson(users, 200);
  } catch (error) {
    return errorHandler(error);
  }
};
