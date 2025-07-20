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
import Footer from '@/components/layout/Footer';

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
      <div className="w-full">
        <header className="sticky top-0 z-10 p-4 flex justify-between align-center bg-secondary-dark border-b border-custom-black/20 h-[68px]">
          <SidebarTrigger />
          <div>
            {!isLoggedIn && (
              <Button asChild>
                <Link href={appRouter.login}>Login</Link>
              </Button>
            )}
            {isLoggedIn && <AddButton />}
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
