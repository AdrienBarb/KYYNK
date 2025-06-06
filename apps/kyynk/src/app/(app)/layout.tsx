import { auth } from '@/auth';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Button } from '@/components/ui/Button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/Sidebar';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React, { FC, ReactNode } from 'react';
import { getCookie } from 'cookies-next/server';
import { appRouter } from '@/constants/appRouter';
import AddButton from '@/components/nudes/AddButton';

interface Props {
  children: ReactNode;
}

const AppLayout: FC<Props> = async ({ children }) => {
  const session = await auth();

  const defaultOpen =
    (await getCookie('sidebar_state', { cookies })) === 'true';

  const isLoggedIn = !!session?.user;

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="w-full">
        <div className="p-4 flex justify-between align-center bg-secondary-dark border-b border-custom-black/20 h-[68px]">
          <SidebarTrigger />
          <div>
            {!isLoggedIn && (
              <Button asChild>
                <Link href={appRouter.login}>Login</Link>
              </Button>
            )}
            {isLoggedIn && <AddButton />}
          </div>
        </div>
        <div>{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default AppLayout;
