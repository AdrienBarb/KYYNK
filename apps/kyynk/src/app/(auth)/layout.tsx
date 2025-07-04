import React, { FC, ReactNode } from 'react';
import PageContainer from '@/components/PageContainer';
import NavigationBar from '@/components/layout/NavigationBar';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { appRouter } from '@/constants/appRouter';

interface Props {
  children: ReactNode;
}

const AuthLayout: FC<Props> = async ({ children }) => {
  const session = await auth();

  if (session?.user) {
    redirect(appRouter.models);
  }

  return (
    <main>
      <NavigationBar type="auth" />
      <PageContainer className="px-4 mt-20 mb-12 max-w-lg mx-auto">
        {children}
      </PageContainer>
    </main>
  );
};

export default AuthLayout;
