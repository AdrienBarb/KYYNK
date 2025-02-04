import React from 'react';
import SimpleButton from '@/components/Buttons/SimpleButton';
import UserAddMenu from '@/components/UserAddMenu';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import CreditAmount from '@/components/CreditAmount';
import NavLogo from '../NavLogo';
import { getTranslations } from 'next-intl/server';
import { auth } from '@/auth';
import Menu from '@/components/Menu';
import { SidebarTrigger } from '../ui/Sidebar';

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
            <SimpleButton href="/login" dataId="sign-in-button">
              {t('common.signIn')}
            </SimpleButton>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
