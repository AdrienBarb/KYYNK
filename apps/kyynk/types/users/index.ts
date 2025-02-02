import { User } from '@prisma/client';

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
>;
