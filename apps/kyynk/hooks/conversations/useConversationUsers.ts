import { useMemo } from 'react';
import { User } from '@prisma/client';
import { useUser } from '@/hooks/users/useUser';

const useConversationUsers = (
  participants: Pick<User, 'id' | 'pseudo' | 'profileImageId'>[],
) => {
  const { user } = useUser();

  const otherUser = useMemo(() => {
    return (
      participants.find(
        (p: Pick<User, 'id' | 'pseudo' | 'profileImageId'>) =>
          p.id !== user?.id,
      ) || null
    );
  }, [participants, user?.id]);

  const currentUser = useMemo(() => {
    return (
      participants.find(
        (p: Pick<User, 'id' | 'pseudo' | 'profileImageId'>) =>
          p.id === user?.id,
      ) || null
    );
  }, [participants, user?.id]);

  return { currentUser, otherUser };
};

export default useConversationUsers;
