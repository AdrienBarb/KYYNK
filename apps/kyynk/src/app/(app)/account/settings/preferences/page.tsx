import { auth } from '@/auth';
import PageHeader from '@/components/layout/PageHeader';
import PaddingContainer from '@/components/layout/PaddingContainer';
import { redirect } from 'next/navigation';
import React from 'react';
import { appRouter } from '@/constants/appRouter';
import PreferencesSettings from '@/components/settings/PreferencesSettings';

const PreferencesPage = async () => {
  const session = await auth();

  if (!session) {
    redirect(appRouter.login);
  }

  return (
    <PaddingContainer>
      <PageHeader title="Preferences Settings" className="mb-8" />
      <PreferencesSettings />
    </PaddingContainer>
  );
};

export default PreferencesPage;
