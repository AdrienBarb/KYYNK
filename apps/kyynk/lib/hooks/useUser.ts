import { StoredUser, useUserStore } from '@/stores/UserStore';
import useApi from '@/lib/hooks/useApi';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const useUser = () => {
  const { user, setUser: setUserStore, clearUser } = useUserStore();
  const { useGet } = useApi();
  const { data: session } = useSession();

  const {
    data: fetchedUser,
    isLoading,
    error,
    refetch,
  } = useGet(
    `/api/me`,
    {},
    {
      enabled: !!session?.user?.id,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: true,
    },
  );

  const setUser = (partialUser: Partial<StoredUser>) => {
    const updatedUser = { ...user, ...partialUser };
    setUserStore(updatedUser as StoredUser);
  };

  useEffect(() => {
    if (fetchedUser) {
      setUserStore(fetchedUser);
    }
  }, [fetchedUser, setUserStore]);

  useEffect(() => {
    if (!session?.user?.id) {
      clearUser();
    }
  }, [session?.user?.id, clearUser]);

  return {
    user,
    isLoading,
    error,
    refetch,
    isLoggedIn: () => !!user,
    setUser,
  };
};
