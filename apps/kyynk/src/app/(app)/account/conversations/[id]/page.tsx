import { fetchMessagesByConversationId } from '@/services/conversations/fetchMessagesByConversationId';
import { getConversationById } from '@/services/conversations/getConversationById';
import React from 'react';
import Conversation from '@/components/conversations/Conversation';
import { ConversationType } from '@/types/conversations';

const CurrentConversationPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;

  const conversation = (await getConversationById({
    conversationId: id,
  })) as ConversationType;
  const messages = await fetchMessagesByConversationId({
    conversationId: id,
  });

  return (
    <Conversation
      initialConversation={conversation}
      initialMessages={messages}
    />
  );
};

export default CurrentConversationPage;
