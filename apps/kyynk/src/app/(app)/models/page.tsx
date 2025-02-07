import UsersList from '@/components/UsersList';
import React from 'react';
import { getUsers } from '@/services/users/getUsers';
import { User } from '@prisma/client';

const UsersPage = async () => {
  const initialUsersDatas = (await getUsers()) as User[];

  return <UsersList initialUsers={initialUsersDatas} />;
};

export default UsersPage;
