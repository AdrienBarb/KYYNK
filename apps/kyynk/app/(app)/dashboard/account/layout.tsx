import React, { FC, ReactNode } from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

interface Props {
  children: ReactNode;
}

const AccountLayout: FC<Props> = async ({ children }) => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <>{children}</>;
};

export default AccountLayout;
