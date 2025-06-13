import { useParams } from 'next/navigation';
import useApi from '@/hooks/requests/useApi';
import { messageSchema } from '@/schemas/conversations/messageSchema';
import { hasEnoughCredits } from '@/utils/conversations/hasEnoughCredits';
import toast from 'react-hot-toast';
import { Conversation } from '@prisma/client';
import { getEncodedFullUrl } from '@/utils/links/getEncodedFullUrl';
import { appRouter } from '@/constants/appRouter';
import { useRouter } from 'next/navigation';
import {
  ConversationUser,
  FetchedUserType,
  LoggedUserType,
} from '@/types/users';

interface UseCreateMessageProps {
  user: LoggedUserType | null;
  otherUser: FetchedUserType | ConversationUser | null;
  onNotEnoughCredits: () => void;
  onSuccess?: (data: Conversation) => void;
  isNewConversation?: boolean;
}

export const useCreateMessage = ({
  user,
  otherUser,
  onNotEnoughCredits,
  onSuccess,
  isNewConversation = false,
}: UseCreateMessageProps) => {
  const { id: conversationId, slug } = useParams();
  const { usePost } = useApi();
  const router = useRouter();

  const { mutate: sendMessage, isPending } = usePost(
    isNewConversation
      ? '/api/conversations'
      : `/api/conversations/${conversationId}/messages`,
    {
      onSuccess,
    },
  );

  const handleSendMessage = ({ message }: { message: string }) => {
    try {
      if (!user) {
        const encodedUrl = getEncodedFullUrl();
        router.push(`${appRouter.login}?previousUrl=${encodedUrl}`);
        return;
      }

      messageSchema.parse(message);

      if (
        !hasEnoughCredits({
          user,
          requiredCredits: otherUser?.settings?.creditMessage ?? null,
        })
      ) {
        onNotEnoughCredits();
        return;
      }

      if (isNewConversation) {
        sendMessage({ slug, message });
      } else {
        sendMessage({ message });
      }
    } catch (e) {
      toast.error('Something went wrong');
    }
  };

  return {
    handleSendMessage,
    isPending,
  };
};
