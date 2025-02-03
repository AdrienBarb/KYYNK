import { User } from '@prisma/client';
import { create } from 'zustand';

export type StoredUser = Pick<
  User,
  | 'id'
  | 'pseudo'
  | 'email'
  | 'userType'
  | 'slug'
  | 'description'
  | 'age'
  | 'gender'
  | 'bodyType'
  | 'hairColor'
  | 'country'
  | 'tags'
  | 'profileImageId'
  | 'creditsAmount'
>;

interface UserState {
  user: StoredUser | null;
  setUser: (user: StoredUser) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
