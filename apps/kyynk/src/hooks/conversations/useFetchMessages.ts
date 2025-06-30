import { useParams } from 'next/navigation';
import useApi from '@/hooks/requests/useApi';
import { MessageType } from '@/types/messages';

interface UseFetchMessagesProps {
  initialMessages: MessageType[];
}

export const useFetchMessages = () => {
  const { id: conversationId } = useParams();
  const { useGet } = useApi();

  const { data: messages, refetch } = useGet(
    `/api/conversations/${conversationId}/messages`,
  );

  return {
    messages,
    refetch,
  };
};
