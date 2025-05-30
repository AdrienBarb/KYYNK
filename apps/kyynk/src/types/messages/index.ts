import { Message } from '@prisma/client';
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
