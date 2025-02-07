'use client';

import React, { useState, useEffect, FC, useMemo, useRef } from 'react';
import { useChatScroll } from '@/lib/hooks/useChatScroll';
import { useParams } from 'next/navigation';
import useApi from '@/hooks/requests/useApi';
import { ConversationType } from '@/types/conversations';
import { Message } from '@prisma/client';
import useConversationUsers from '@/hooks/conversations/useConversationUsers';
import ConversationInput from './ConversationInput';

interface Props {
  initialConversation: ConversationType;
  initialMessages: Message[];
}

const Conversation: FC<Props> = ({ initialConversation, initialMessages }) => {
  //localstate

  const { otherUser } = useConversationUsers(initialConversation.participants);

  const { id: conversationId } = useParams();

  const { useGet } = useApi();

  const { data: messages } = useGet(
    `/api/conversations/${conversationId}/messages`,
    {},
    {
      initialData: initialMessages,
    },
  );

  const ref = useChatScroll(messages);

  return (
    <div className="flex flex-col" style={{ height: '90vh' }}>
      <div
        className="flex-grow flex flex-col gap-4 overflow-y-scroll"
        ref={ref}
      >
        {/* {messages.map((currentMessage, index) => {
            return (
              <UserMessage
                key={index}
                message={currentMessage}
                conversation={conversation}
                index={index}
              />
            );
          })} */}
      </div>
      <div className="sticky bottom-0">
        <ConversationInput />
      </div>
    </div>
  );
};

export default Conversation;
