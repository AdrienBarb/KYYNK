import { fetchMessagesByConversationId } from '@/services/conversations/fetchMessagesByConversationId';
import { getConversationById } from '@/services/conversations/getConversationById';
import React from 'react';
import Conversation from '@/components/conversations/Conversation';
import { ConversationType } from '@/types/conversations';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { appRouter } from '@/constants/appRouter';
import { MessageType } from '@/types/messages';
import { formatNudeWithPermissions } from '@/utils/nudes/formatNudeWithPermissions';
import { NudeFromPrisma } from '@/types/nudes';

const CurrentConversationPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const session = await auth();
  const conversation = (await getConversationById({
    conversationId: id,
  })) as ConversationType;

  if (!session) {
    redirect(appRouter.login);
  }

  if (
    !conversation ||
    !conversation.participants.some((p) => p.id === session.user.id)
  ) {
    redirect(appRouter.home);
  }

  const messages = (await fetchMessagesByConversationId({
    conversationId: id,
  })) as MessageType[];

  const messagesWithPermissions = messages.map((message) => {
    if (message.nude) {
      return {
        ...message,
        nude: formatNudeWithPermissions(message.nude, session.user.id),
      };
    }
    return message;
  });

  return (
    <Conversation
      initialConversation={conversation}
      initialMessages={messagesWithPermissions}
    />
  );
};

export default CurrentConversationPage;
