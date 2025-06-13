import useApi from '@/hooks/requests/useApi';
import { ConversationType } from '@/types/conversations';

export const useConversations = () => {
  const { useGet } = useApi();

  const {
    data: conversations,
    isLoading,
    error,
    refetch,
  } = useGet('/api/conversations');

  return {
    conversations: conversations as ConversationType[] | undefined,
    isLoading,
    error,
    refetch,
  };
};
