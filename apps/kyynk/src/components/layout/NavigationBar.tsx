import React from 'react';
import NavLogo from '../NavLogo';
import { getTranslations } from 'next-intl/server';
import { auth } from '@/auth';
import { Button } from '../ui/Button';
import Link from 'next/link';

const NavigationBar = async () => {
  const t = await getTranslations();
  const session = await auth();
  const isUserConnected = !!session?.user;

  return (
    <header>
      <div className="bg-secondary w-full px-8 py-4 h-[48px] fixed top-0 right-0 left-0 z-[1000] border-b border-custom-black/20 flex">
        <div className="flex justify-between mx-auto w-full max-w-7xl items-center">
          <NavLogo />

          {!isUserConnected && (
            <Button asChild>
              <Link href="/login">{t('common.signIn')}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
