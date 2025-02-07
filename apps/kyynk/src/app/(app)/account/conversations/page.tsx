import React from 'react';
import { auth } from '@/auth';
import { getUserConversations } from '@/services/conversations/getUserConversations';
import ConversationList from '@/components/conversations/ConversationList';
import PageHeader from '@/components/layout/PageHeader';

const MessagesPage = async () => {
  const session = await auth();

  const conversations = await getUserConversations({
    userId: session?.user.id!,
  });

  return (
    <>
      <PageHeader title="Conversations" />
      <ConversationList initConversations={conversations} />
    </>
  );
};

export default MessagesPage;
