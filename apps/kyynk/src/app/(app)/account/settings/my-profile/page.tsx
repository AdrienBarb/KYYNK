import { auth } from '@/auth';
import PageHeader from '@/components/layout/PageHeader';
import PaddingContainer from '@/components/layout/PaddingContainer';
import { redirect } from 'next/navigation';
import React from 'react';
import { appRouter } from '@/constants/appRouter';
import UserForm from '@/components/UserForm';

const PreferencesPage = async () => {
  const session = await auth();

  if (!session) {
    redirect(appRouter.login);
  }

  return (
    <PaddingContainer>
      <PageHeader title="My Profile" />
      <UserForm />
    </PaddingContainer>
  );
};

export default PreferencesPage;
