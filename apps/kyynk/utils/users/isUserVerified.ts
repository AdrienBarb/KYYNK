import { LoggedUserType } from '@/types/users';

export const isUserVerified = ({ user }: { user: LoggedUserType | null }) => {
  if (!user) {
    return false;
  }

  return (
    user.isEmailVerified &&
    user.identityVerificationStatus === 'verified' &&
    user.profileImageId &&
    user.nudesCount
  );
};
