import React from 'react';
import styles from '@/styles/NavigationBar.module.scss';
import SimpleButton from '@/components/Buttons/SimpleButton';
import UserAddMenu from '@/shared/components/UserAddMenu';
import LanguageSwitcher from '@/shared/components/LanguageSwitcher';
import CreditAmount from '@/shared/components/CreditAmount';
import NavLogo from '../NavLogo';
import { getTranslations } from 'next-intl/server';
import { auth } from '@/auth';
import Menu from '@/shared/components/Menu';

const NavigationBar = async () => {
  const t = await getTranslations();
  const session = await auth();

  const isUserConnected = session?.user;

  return (
    <header>
      <div className={styles.navContainer}>
        <div className="flex justify-between mx-auto w-full max-w-7xl">
          <Menu />

          <NavLogo />

          <div className={styles.flexWrapper}>
            {!isUserConnected && (
              <SimpleButton href="/login" dataId="sign-in-button">
                {t('common.signIn')}
              </SimpleButton>
            )}

            {isUserConnected && session?.user?.userType === 'creator' && (
              <UserAddMenu />
            )}

            <CreditAmount />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
