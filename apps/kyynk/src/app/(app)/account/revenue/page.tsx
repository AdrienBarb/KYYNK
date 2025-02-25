import { auth } from '@/auth';
import PaddingContainer from '@/components/layout/PaddingContainer';
import PageHeader from '@/components/layout/PageHeader';
import RevenueDashboard from '@/components/revenue/RevenueDashboard';
import { redirect } from 'next/navigation';
import React from 'react';

const RevenuePage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <PaddingContainer>
      <PageHeader title="Revenue" />
      <RevenueDashboard />
    </PaddingContainer>
  );
};

export default RevenuePage;
