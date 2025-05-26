import UsersList from '@/components/UsersList';
import React from 'react';
import { getUsers } from '@/services/users/getUsers';
import { User } from '@/generated/prisma';
import PaddingContainer from '@/components/layout/PaddingContainer';
const UsersPage = async () => {
  const initialUsersDatas = (await getUsers()) as User[];

  return (
    <PaddingContainer>
      <UsersList initialUsers={initialUsersDatas} />
    </PaddingContainer>
  );
};

export default UsersPage;
