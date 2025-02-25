'use client';

import React, { FC } from 'react';
import useApi from '@/hooks/requests/useApi';
import AppMessage from '@/components/AppMessage';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { appRouter } from '@/constants/appRouter';
import ConversationCard from './ConversationCard';
import { ConversationType } from '@/types/conversations';

interface Props {
  initConversations: ConversationType[];
}

const ConversationList: FC<Props> = ({ initConversations }) => {
  const router = useRouter();

  const { useGet } = useApi();

  const { data: conversations } = useGet(
    '/api/conversations',
    {},
    {
      initialData: initConversations,
    },
  );

  if (conversations.length === 0) {
    return (
      <AppMessage
        title="No Conversations"
        text="No conversation has been found."
      >
        <Button
          className="w-full"
          onClick={() => router.push(appRouter.models)}
        >
          Start Chatting
        </Button>
      </AppMessage>
    );
  }

  return (
    <div className="h-full w-full overflow-y-scroll flex flex-col gap-2">
      {conversations.map((currentConversation: ConversationType) => {
        return (
          <ConversationCard
            key={currentConversation.id}
            conversation={currentConversation}
          />
        );
      })}
    </div>
  );
};

export default ConversationList;
