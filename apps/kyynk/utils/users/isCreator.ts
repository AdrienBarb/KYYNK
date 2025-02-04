import { LoggedUserType } from '@/types/users';

export const isCreator = ({ user }: { user: LoggedUserType | null }) => {
  if (!user) {
    return false;
  }

  return user.userType === 'creator';
};
