import LoginNavigationBar from '@/components/LoginNavigationBar';
import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AuthLayout: FC<Props> = async ({ children }) => {
  return (
    <>
      <header>
        <LoginNavigationBar />
      </header>
      <main>{children}</main>
    </>
  );
};

export default AuthLayout;
