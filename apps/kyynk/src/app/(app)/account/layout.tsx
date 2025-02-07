'use client';

import DashboardMenu from '@/components/DashboardMenu';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import useCheckIfUserVerified from '@/lib/hooks/useCheckIfUserVerified';
import { useRouter } from 'next/navigation';

interface Props {
  children: ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
  const { data: session } = useSession();
  // TODO uncomment
  // const checkIfUserVerified = useCheckIfUserVerified();
  // const router = useRouter();

  // useEffect(() => {
  //   if (session?.user?.id && !session?.user?.userType) {
  //     router.push('/register/user-type');
  //   }
  // }, [session?.user?.id]);

  // useEffect(() => {
  //   if (!session) {
  //     router.push('/login');
  //   }

  //   checkIfUserVerified();
  // }, [session]);

  return children;
};

export default DashboardLayout;
