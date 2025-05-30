import { Conversation, User } from '@/generated/prisma';
import { ConversationUser } from '../users';

export type ConversationType = Pick<
  Conversation,
  'id' | 'createdAt' | 'updatedAt' | 'isArchived'
> & {
  participants: ConversationUser[];
  hasUnreadMessages: boolean;
};
