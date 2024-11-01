import UsersList from '@/components/UsersList';
import React from 'react';
import userService from '@/features/user/userService';
import ScrollableContainer from '@/components/ScrollableContainer';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const UsersPage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const initialUsersDatas = await userService.getAllUsers();

  return (
    <ScrollableContainer>
      <UsersList initialUsersDatas={initialUsersDatas} />
    </ScrollableContainer>
  );
};

export default UsersPage;
