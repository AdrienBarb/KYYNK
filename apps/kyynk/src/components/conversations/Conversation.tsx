'use client';

import React, { FC } from 'react';
import { useChatScroll } from '@/lib/hooks/useChatScroll';
import { ConversationType } from '@/types/conversations';
import useConversationUsers from '@/hooks/conversations/useConversationUsers';
import { useUser } from '@/hooks/users/useUser';
import { isCreator } from '@/utils/users/isCreator';
import { isUserVerified } from '@/utils/users/isUserVerified';
import {
  ConversationModalsProvider,
  useConversationModals,
} from '@/contexts/ConversationModalsContext';
import ConversationHeader from './ConversationHeader';
import MessageList from './MessageList';
import ConversationInput from './ConversationInput';
import NudeModal from '../modals/NudeModal';
import PrivateNudeModal from '../modals/PrivateNudeModal';
import { useFetchMessages } from '@/hooks/messages/useFetchMessages';
import { useSendMessage } from '@/hooks/messages/useSendMessage';
import { useRealtimeMessages } from '@/hooks/messages/useRealtimeMessages';
import { useParams } from 'next/navigation';
import useApi from '@/hooks/requests/useApi';

interface Props {
  initialConversation: ConversationType;
}

const ConversationContent: FC<Props> = ({ initialConversation }) => {
  const { otherUser } = useConversationUsers(initialConversation.participants);
  const { user, refetch: refetchUser } = useUser();
  const { id: conversationId } = useParams();
  const { fetchData } = useApi();

  useRealtimeMessages(conversationId as string, async (newMessage) => {
    if (newMessage.senderId === user?.id) {
      return;
    }

    const message = await fetchData(`/api/messages/${newMessage.id}`);
    addMessageToCache(message);
  });

  const {
    openPrivateNudeModal,
    setOpenPrivateNudeModal,
    isNudeModalOpen,
    setNudeModalOpen,
    selectedNude,
    setSelectedNude,
  } = useConversationModals();

  const { messages, refetch, addMessageToCache } = useFetchMessages();
  const { handleSendMessage, isPending } = useSendMessage({
    user,
    otherUser,
    onSuccess: (createdMessage) => {
      addMessageToCache(createdMessage);
      refetchUser();
    },
  });

  const ref = useChatScroll(messages);

  const handleOpenPrivateNudeModal = () => {
    setOpenPrivateNudeModal(true);
  };

  return (
    <div className="flex flex-col" style={{ height: 'calc(100dvh - 68px)' }}>
      <ConversationHeader otherUser={otherUser} />

      <MessageList
        messages={messages}
        currentUserId={user?.id}
        scrollRef={ref}
      />

      <div className="sticky bottom-0 mt-8 p-4">
        <ConversationInput
          isDisabled={false}
          creditMessage={otherUser?.settings?.creditMessage}
          onSendMessage={handleSendMessage}
          isCreationMessageLoading={isPending}
          canSendPrivateNude={isCreator({ user }) && isUserVerified({ user })}
          openPrivateNudeModal={handleOpenPrivateNudeModal}
        />
      </div>

      <NudeModal
        isOpen={isNudeModalOpen}
        onClose={() => setNudeModalOpen(false)}
        nude={selectedNude}
        refetch={refetch}
        setSelectedNude={setSelectedNude}
      />

      <PrivateNudeModal
        open={openPrivateNudeModal}
        setOpen={setOpenPrivateNudeModal}
      />
    </div>
  );
};

const Conversation: FC<Props> = (props) => {
  return (
    <ConversationModalsProvider>
      <ConversationContent {...props} />
    </ConversationModalsProvider>
  );
};

export default Conversation;
