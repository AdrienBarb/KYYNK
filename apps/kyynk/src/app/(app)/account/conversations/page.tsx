import React from 'react';
import { auth } from '@/auth';
import { getUserConversations } from '@/services/conversations/getUserConversations';
import ConversationList from '@/components/conversations/ConversationList';
import PageHeader from '@/components/layout/PageHeader';
import PaddingContainer from '@/components/layout/PaddingContainer';
import { ConversationType } from '@/types/conversations';

const MessagesPage = async () => {
  const session = await auth();

  const conversations = (await getUserConversations({
    userId: session?.user.id!,
  })) as ConversationType[];

  return (
    <PaddingContainer>
      <PageHeader title="Conversations" />
      <ConversationList initConversations={conversations} />
    </PaddingContainer>
  );
};

export default MessagesPage;
