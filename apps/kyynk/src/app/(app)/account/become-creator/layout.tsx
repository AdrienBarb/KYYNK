'use client';

import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import PaddingContainer from '@/components/layout/PaddingContainer';

const BecomeCreatorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PaddingContainer>
      <PageHeader
        title="Become a Creator"
        description="You need to complete these steps for your profile to be visible to other users."
        className="mb-4"
      />
      {children}
    </PaddingContainer>
  );
};

export default BecomeCreatorLayout;
