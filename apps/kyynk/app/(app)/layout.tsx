import Footer from '@/shared/components/layout/Footer';
import NavigationBar from '@/shared/components/layout/NavigationBar';
import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <main className="mt-[48px] mx-auto max-w-7xl pt-8 px-4 pb-12">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
