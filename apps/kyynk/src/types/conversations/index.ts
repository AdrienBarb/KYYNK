import { Conversation, User } from '@prisma/client';

export type ConversationType = Pick<
  Conversation,
  'id' | 'createdAt' | 'updatedAt' | 'isArchived'
> & {
  participants: Pick<User, 'id' | 'pseudo' | 'profileImageId'>[];
  hasUnreadMessages: boolean;
};
