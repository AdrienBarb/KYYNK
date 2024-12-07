import { StoredUser, useUserStore } from '@/stores/UserStore';

export const useUser = () => {
  const user = useUserStore((state) => state.user);
  const setUserStore = useUserStore((state) => state.setUser);
  const clearUserStore = useUserStore((state) => state.clearUser);

  const setUser = (partialUser: Partial<StoredUser>) => {
    const updatedUser = { ...user, ...partialUser };
    setUserStore(updatedUser as StoredUser);
  };

  const isLoggedIn = () => !!user;

  const getUser = () => user;

  const clearUser = () => clearUserStore();

  return {
    user,
    setUser,
    getUser,
    isLoggedIn,
    clearUser,
  };
};
