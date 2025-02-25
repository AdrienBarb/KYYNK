import { auth } from '@/auth';
import PageHeader from '@/components/layout/PageHeader';
import PaddingContainer from '@/components/layout/PaddingContainer';
import ConversationSettings from '@/components/settings/ConversationSettings';
import { redirect } from 'next/navigation';
import React from 'react';

const SettingsConversationsPage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <PaddingContainer>
      <PageHeader title="Conversations Settings" />
      <ConversationSettings />
    </PaddingContainer>
  );
};

export default SettingsConversationsPage;
