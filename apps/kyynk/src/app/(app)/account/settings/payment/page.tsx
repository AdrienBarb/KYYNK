import { auth } from '@/auth';
import PageHeader from '@/components/layout/PageHeader';
import PaddingContainer from '@/components/layout/PaddingContainer';
import PaymentSettings from '@/components/settings/PaymentSettings';
import { redirect } from 'next/navigation';
import React from 'react';
import { appRouter } from '@/constants/appRouter';

const SettingsPaymentPage = async () => {
  const session = await auth();

  if (!session) {
    redirect(appRouter.login);
  }

  return (
    <PaddingContainer>
      <PageHeader title="Payment Settings" />
      <PaymentSettings />
    </PaddingContainer>
  );
};

export default SettingsPaymentPage;
