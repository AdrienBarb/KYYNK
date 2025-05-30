import { Message } from '@/generated/prisma';
import { NudeFromPrisma, NudeWithPermissions } from '../nudes';

export type MessageType = Pick<
  Message,
  'id' | 'content' | 'senderId' | 'createdAt' | 'status'
> & {
  nude?: NudeFromPrisma;
};

export type MessageWithNudePermissions = MessageType & {
  nude: NudeWithPermissions;
};
