import { User, UserSettings } from '@/generated/prisma';

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
  | 'preferences'
  | 'creditsAmount'
  | 'isEmailVerified'
  | 'identityVerificationStatus'
  | 'nudesCount'
  | 'contentProviderPolicyAccepted'
  | 'lastSeenAt'
> & {
  settings: Pick<
    UserSettings,
    'fiatMessage' | 'creditMessage' | 'bankAccountName' | 'iban'
  >;
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
  | 'lastSeenAt'
>;

export type ConversationUser = Pick<
  User,
  'id' | 'pseudo' | 'profileImageId' | 'slug'
> & {
  settings?: Pick<UserSettings, 'creditMessage'>;
};
