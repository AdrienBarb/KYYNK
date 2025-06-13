'use client';

import React, { FC, useState } from 'react';
import { useChatScroll } from '@/lib/hooks/useChatScroll';
import { useParams } from 'next/navigation';
import useApi from '@/hooks/requests/useApi';
import { ConversationType } from '@/types/conversations';
import useConversationUsers from '@/hooks/conversations/useConversationUsers';
import { useUser } from '@/hooks/users/useUser';
import Avatar from '../ui/Avatar';
import Link from 'next/link';
import Text from '../ui/Text';
import { MessageType, MessageWithNudePermissions } from '@/types/messages';
import NudeCard from '../nudes/NudeCard';
import { cn } from '@/utils/tailwind/cn';
import NudeModal from '@/components/modals/NudeModal';
import { NudeWithPermissions } from '@/types/nudes';
import { UserType } from '@prisma/client';
import { messageSchema } from '@/schemas/conversations/messageSchema';
import toast from 'react-hot-toast';
import ConversationInput from './ConversationInput';
import NotEnoughCreditsModal from '../modals/NotEnoughCreditsModal';
import { hasEnoughCredits } from '@/utils/conversations/hasEnoughCredits';
import { isCreator } from '@/utils/users/isCreator';
import { isUserVerified } from '@/utils/users/isUserVerified';
import PrivateNudeModal from '../modals/PrivateNudeModal';

interface Props {
  initialConversation: ConversationType;
  initialMessages: MessageType[];
}

const Conversation: FC<Props> = ({ initialConversation, initialMessages }) => {
  const { id: conversationId } = useParams();
  const { otherUser } = useConversationUsers(initialConversation.participants);

  const { useGet, usePost } = useApi();
  const { user, refetch: refetchUser } = useUser();

  const [openNotEnoughCreditModal, setOpenNotEnoughCreditModal] =
    useState(false);
  const [openPrivateNudeModal, setOpenPrivateNudeModal] = useState(false);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [selectedNude, setSelectedNude] = React.useState<
    NudeWithPermissions | undefined | null
  >(null);

  const { data: messages, refetch } = useGet(
    `/api/conversations/${conversationId}/messages`,
    {},
    {
      initialData: initialMessages,
    },
  );

  const { mutate: sendMessage, isPending } = usePost(
    `/api/conversations/${conversationId}/messages`,
    {
      onSuccess: () => {
        refetch();
        refetchUser();
      },
    },
  );

  const ref = useChatScroll(messages);

  const handleNudeClick = (nude: NudeWithPermissions | undefined) => {
    setSelectedNude(nude);
    setModalOpen(true);
  };

  const handleSendMessage = ({ message }: { message: string }) => {
    try {
      messageSchema.parse(message);

      if (
        !hasEnoughCredits({
          user,
          requiredCredits: otherUser?.settings?.creditMessage ?? null,
        })
      ) {
        setOpenNotEnoughCreditModal(true);
        return;
      }

      sendMessage({ content: message });
    } catch (e) {
      toast.error('Something went wrong');
    }
  };

  const handleOpenPrivateNudeModal = () => {
    setOpenPrivateNudeModal(true);
  };

  return (
    <div className="flex flex-col" style={{ height: 'calc(100dvh - 68px)' }}>
      <div className="flex justify-between items-center mb-2 p-4">
        {otherUser?.userType === UserType.creator ? (
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
        ) : (
          <div className="flex items-center gap-2">
            <Avatar
              imageId={otherUser?.profileImageId}
              pseudo={otherUser?.pseudo}
              size={40}
            />
            <Text className="text-lg font-bold">{otherUser?.pseudo}</Text>
          </div>
        )}
      </div>

      <div
        className="flex flex-col gap-4 px-4 h-[100%] w-full overflow-y-scroll"
        ref={ref}
      >
        {messages.map((currentMessage: MessageWithNudePermissions) => {
          const isMyMessage = currentMessage.senderId === user?.id;

          return (
            <div
              key={currentMessage.id}
              className={cn(
                'max-w-[80%] flex flex-col',
                isMyMessage ? 'self-end' : 'self-start',
                isMyMessage ? 'items-end' : 'items-start',
              )}
            >
              {currentMessage.nude && (
                <div className="w-32 mb-2">
                  <NudeCard
                    key={currentMessage.nude.id}
                    nude={currentMessage.nude}
                    onClick={() => handleNudeClick(currentMessage.nude)}
                  />
                </div>
              )}
              <p
                className={cn(
                  'p-2 rounded-lg',
                  isMyMessage
                    ? 'bg-primary text-custom-black'
                    : 'bg-secondary-dark text-custom-black',
                )}
              >
                {currentMessage.content}
              </p>
            </div>
          );
        })}
      </div>

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

      <NotEnoughCreditsModal
        open={openNotEnoughCreditModal}
        onOpenChange={setOpenNotEnoughCreditModal}
      />

      <NudeModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        nude={selectedNude}
        refetch={refetch}
        setSelectedNude={setSelectedNude}
      />

      <PrivateNudeModal
        open={openPrivateNudeModal}
        setOpen={setOpenPrivateNudeModal}
        refetch={refetch}
      />
    </div>
  );
};

export default Conversation;
