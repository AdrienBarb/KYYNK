'use client';

import React from 'react';
import NavLogo from '@/components/NavLogo';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const LoginNavigationBar = () => {
  return (
    <header>
      <div className="bg-secondary w-full px-8 py-4 h-[48px] fixed top-0 right-0 left-0 z-[1000] border-b border-custom-black/20 flex">
        <div className="flex justify-between mx-auto w-full max-w-7xl items-center">
          <NavLogo />

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default LoginNavigationBar;
