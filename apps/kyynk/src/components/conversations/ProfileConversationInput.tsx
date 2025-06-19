'use client';

import ConversationInput from './ConversationInput';
import TypingCarousel from './TypingCarousel';
import { FetchedUserType } from '@/types/users';
import { useUser } from '@/hooks/users/useUser';
import { isUserVerified } from '@/utils/users/isUserVerified';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useConversations } from '@/hooks/conversations/useConversations';
import { useState } from 'react';
import NotEnoughCreditsModal from '../modals/NotEnoughCreditsModal';
import { useCreateMessage } from '@/hooks/conversations/useCreateMessage';

const ProfileConversationInput = ({ user }: { user: FetchedUserType }) => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { user: loggedUser, refetch: refetchUser } = useUser();
  const [openNotEnoughCreditModal, setOpenNotEnoughCreditModal] =
    useState(false);
  const { refetch: refetchConversations } = useConversations();

  const { handleSendMessage, isPending } = useCreateMessage({
    user: loggedUser,
    otherUser: user,
    onNotEnoughCredits: () => setOpenNotEnoughCreditModal(true),
    onSuccess: (newConversation) => {
      refetchConversations();
      refetchUser();
      router.push(`/account/conversations/${newConversation.id}`);
    },
    isNewConversation: true,
  });

  if (loggedUser?.slug !== slug && !isUserVerified({ user })) {
    return null;
  }

  if (loggedUser?.slug === slug) {
    return null;
  }

  return (
    <div className="w-full mx-auto mt-8 mb-16">
      <ConversationInput
        creditMessage={user.settings.creditMessage}
        onSendMessage={handleSendMessage}
        isCreationMessageLoading={isPending}
      />

      <NotEnoughCreditsModal
        open={openNotEnoughCreditModal}
        onOpenChange={setOpenNotEnoughCreditModal}
      />
    </div>
  );
};

export default ProfileConversationInput;
