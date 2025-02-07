'use client';

import React, { useState, useEffect, FC, useMemo, useRef } from 'react';
import { useChatScroll } from '@/lib/hooks/useChatScroll';
import { useParams } from 'next/navigation';
import useApi from '@/hooks/requests/useApi';
import { ConversationType } from '@/types/conversations';
import { Message } from '@prisma/client';
import useConversationUsers from '@/hooks/conversations/useConversationUsers';
import ConversationInput from './ConversationInput';
import { useUser } from '@/hooks/users/useUser';
import Avatar from '../ui/Avatar';
import Link from 'next/link';
import Text from '../ui/Text';
interface Props {
  initialConversation: ConversationType;
  initialMessages: Message[];
}

const Conversation: FC<Props> = ({ initialConversation, initialMessages }) => {
  const { id: conversationId } = useParams();
  const { otherUser } = useConversationUsers(initialConversation.participants);
  const { useGet } = useApi();
  const { user } = useUser();

  const { data: messages, refetch } = useGet(
    `/api/conversations/${conversationId}/messages`,
    {},
    {
      initialData: initialMessages,
    },
  );

  const ref = useChatScroll(messages);

  return (
    <div className="flex flex-col" style={{ height: '90vh' }}>
      <div className="flex justify-between items-center mb-2">
        <Link href={`/${otherUser?.slug}`}>
          <div className="flex items-center gap-2">
            <Avatar
              imageId={otherUser?.profileImageId}
              pseudo={otherUser?.pseudo}
              size={40}
            />
            <Text className="text-lg font-bold">{otherUser?.pseudo}</Text>
          </div>
        </Link>
      </div>
      <div
        className="flex-grow flex flex-col gap-4 overflow-y-scroll"
        ref={ref}
      >
        {messages.map((currentMessage: Message) => {
          const isMyMessage = currentMessage.senderId === user?.id;

          return (
            <div
              key={currentMessage.id}
              className={`p-2 rounded-lg max-w-[80%] ${
                isMyMessage
                  ? 'bg-primary text-custom-black self-end'
                  : 'bg-secondary-dark text-custom-black self-start'
              }`}
            >
              <p>{currentMessage.content}</p>
            </div>
          );
        })}
      </div>
      <div className="sticky bottom-0 mt-8">
        <ConversationInput refetch={refetch} />
      </div>
    </div>
  );
};

export default Conversation;
