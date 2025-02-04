'use client';

import React from 'react';
import PageHeader from '@/components/layout/PageHeader';

const BecomeCreatorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PageHeader
        title="Become a Creator"
        description="You need to complete these steps for your profile to be visible to other users."
      />
      <div className="max-w-screen-sm mx-auto mt-16 p-8 border border-custom-black/20 rounded-lg">
        {children}
      </div>
    </>
  );
};

export default BecomeCreatorLayout;
