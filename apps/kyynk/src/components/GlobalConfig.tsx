'use client';

import React, { FC, ReactNode, useEffect, useState } from 'react';
import Maintenance from './Maintenance';
import { useSession } from 'next-auth/react';
import { useUser } from '@/hooks/users/useUser';

interface Props {
  children: ReactNode;
}

const GlobalConfig: FC<Props> = ({ children }) => {
  const [shouldAllowAccess, setShouldAllowAccess] = useState(true);
  const { data: session } = useSession();
  console.log('🚀 ~ session:', session);
  const { refetch } = useUser();

  // TODO: DECOMMENT
  // useEffect(() => {
  //   const getConfig = async () => {
  //     try {
  //       const config = await configService.checkIsMaintenance();

  //       setShouldAllowAccess(config);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   getConfig();
  // }, []);

  useEffect(() => {
    console.log('🚀 ~ useEffect ~ session?.user?.id:', session?.user?.id);
    if (session?.user?.id) {
      console.log('🚀 ~ useEffect ~ refetching');
      refetch();
    }
  }, [session?.user?.id, refetch]);

  if (!shouldAllowAccess) {
    return <Maintenance />;
  }

  return <>{children}</>;
};

export default GlobalConfig;
