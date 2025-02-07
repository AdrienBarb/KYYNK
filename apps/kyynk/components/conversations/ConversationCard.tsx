import React, { FC } from 'react';
import useConversationUsers from '@/hooks/conversations/useConversationUsers';
import Avatar from '../ui/Avatar';
import { ConversationType } from '@/types/conversations';
import Link from 'next/link';

interface Props {
  conversation: ConversationType;
}

const ConversationCard: FC<Props> = ({ conversation }) => {
  const { otherUser } = useConversationUsers(conversation.participants);

  return (
    <Link href={`/account/conversations/${conversation.id}`}>
      <div className="flex items-center justify-between cursor-pointer p-2.5 border-b border-gray-200 rounded-md bg-primary hover:bg-primary-light">
        <div className="flex items-center gap-4">
          <Avatar
            size={32}
            imageId={otherUser?.profileImageId}
            pseudo={otherUser?.pseudo}
          />
          <div className="text-lg font-medium text-secondary">
            {otherUser?.pseudo}
          </div>
        </div>

        {conversation.hasUnreadMessages && (
          <span className="h-2.5 w-2.5 bg-secondary rounded-full"></span>
        )}
      </div>
    </Link>
  );
};

export default ConversationCard;
