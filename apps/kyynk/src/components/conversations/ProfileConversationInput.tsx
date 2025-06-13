'use client';

import ConversationInput from './ConversationInput';
import TypingCarousel from './TypingCarousel';
import { FetchedUserType } from '@/types/users';
import { useUser } from '@/hooks/users/useUser';
import { isUserVerified } from '@/utils/users/isUserVerified';
import { useParams } from 'next/navigation';
import useApi from '@/hooks/requests/useApi';
import { useRouter } from 'next/navigation';
import { Conversation } from '@prisma/client';
import { getEncodedFullUrl } from '@/utils/links/getEncodedFullUrl';
import { appRouter } from '@/constants/appRouter';

const ProfileConversationInput = ({ user }: { user: FetchedUserType }) => {
  const { slug } = useParams<{ slug: string }>();
  const { usePost } = useApi();
  const router = useRouter();
  const { user: loggedUser } = useUser();

  const { mutate: createConversation, isPending } = usePost(
    `/api/conversations`,
    {
      onSuccess: (newConversation: Conversation) => {
        console.log(
          '🚀 ~ ProfileConversationInput ~ newConversation:',
          newConversation,
        );
        router.push(`/account/conversations/${newConversation.id}`);
      },
    },
  );

  const handleSendMessage = ({ message }: { message: string }) => {
    console.log('🚀 ~ handleSendMessage ~ message:', message);
    if (!loggedUser) {
      const encodedUrl = getEncodedFullUrl();
      router.push(`${appRouter.login}?previousUrl=${encodedUrl}`);
      return;
    }

    if (!message.trim()) {
      return;
    }

    createConversation({ slug, message });
  };

  if (loggedUser?.slug !== slug && !isUserVerified({ user })) {
    return null;
  }

  return (
    <div className="w-full h-[80dvh] flex flex-col items-center justify-center">
      <TypingCarousel
        texts={[
          "Let's talk... just you and me...",
          "Don't be shy, I'm all yours now...",
          'I have something naughty to tell you...',
        ]}
      />

      <ConversationInput
        isDisabled={loggedUser?.slug === slug}
        creditMessage={user.settings.creditMessage}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ProfileConversationInput;
