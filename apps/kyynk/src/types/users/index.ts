import { User, UserSettings } from '@prisma/client';

export type LoggedUserType = Pick<
  User,
  | 'id'
  | 'pseudo'
  | 'slug'
  | 'userType'
  | 'description'
  | 'profileImageId'
  | 'isArchived'
  | 'age'
  | 'gender'
  | 'bodyType'
  | 'hairColor'
  | 'country'
  | 'tags'
  | 'creditsAmount'
  | 'isEmailVerified'
  | 'identityVerificationStatus'
  | 'nudesCount'
> & {
  settings: Pick<UserSettings, 'fiatMessage' | 'creditMessage'>;
};

export type FetchedUserType = Pick<
  User,
  | 'id'
  | 'pseudo'
  | 'slug'
  | 'userType'
  | 'description'
  | 'profileImageId'
  | 'isArchived'
  | 'isEmailVerified'
  | 'identityVerificationStatus'
  | 'nudesCount'
>;
