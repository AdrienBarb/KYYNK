import { FetchedUserType, LoggedUserType } from '@/types/users';

export const isUserVerified = ({
  user,
}: {
  user: LoggedUserType | FetchedUserType | null;
}) => {
  if (!user) {
    return false;
  }

  return (
    user.isEmailVerified &&
    user.identityVerificationStatus === 'verified' &&
    user.profileImageId
  );
};
