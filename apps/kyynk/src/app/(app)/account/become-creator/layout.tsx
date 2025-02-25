'use client';

import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import PaddingContainer from '@/components/layout/PaddingContainer';
import { Card } from '@/components/ui/Card';

const BecomeCreatorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PaddingContainer>
      <PageHeader
        title="Become a Creator"
        description="You need to complete these steps for your profile to be visible to other users."
        className="mb-4"
      />
      <Card className="max-w-screen-sm mx-auto">{children}</Card>
    </PaddingContainer>
  );
};

export default BecomeCreatorLayout;
