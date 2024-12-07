'use client';

import configService from '@/features/config/configService';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import Maintenance from './Maintenance';
import { useSession } from 'next-auth/react';
import useApi from '@/lib/hooks/useApi';
import { useUser } from '@/lib/hooks/useUser';

interface Props {
  children: ReactNode;
}

const GlobalConfig: FC<Props> = ({ children }) => {
  const [shouldAllowAccess, setShouldAllowAccess] = useState(true);
  const { data: session } = useSession();
  const { fetchData } = useApi();
  const { setUser, clearUser, getUser } = useUser();

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

  const initUser = async () => {
    const r = await fetchData(`/api/me`);
    setUser(r);
  };

  useEffect(() => {
    if (session?.user?.id) {
      initUser();
    } else {
      clearUser();
    }
  }, [session?.user?.id]);

  if (!shouldAllowAccess) {
    return <Maintenance />;
  }

  return <>{children}</>;
};

export default GlobalConfig;
