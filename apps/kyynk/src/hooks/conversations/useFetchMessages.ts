import { useParams } from 'next/navigation';
import useApi from '@/hooks/requests/useApi';
import { MessageType } from '@/types/messages';

interface UseFetchMessagesProps {
  initialMessages: MessageType[];
}

export const useFetchMessages = ({
  initialMessages,
}: UseFetchMessagesProps) => {
  const { id: conversationId } = useParams();
  const { useGet } = useApi();

  const { data: messages, refetch } = useGet(
    `/api/conversations/${conversationId}/messages`,
    {},
    {
      initialData: initialMessages,
    },
  );

  return {
    messages,
    refetch,
  };
};
