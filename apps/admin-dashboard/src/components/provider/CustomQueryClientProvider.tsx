'use client';

import React, { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface CustomQueryClientProviderProps {
  children: ReactNode;
}

const CustomQueryClientProvider: FC<CustomQueryClientProviderProps> = ({
  children,
}) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default CustomQueryClientProvider;
