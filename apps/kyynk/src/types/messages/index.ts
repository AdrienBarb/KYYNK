import { Message } from '@prisma/client';
import { NudeType } from '../nudes';

export type MessageType = Pick<
  Message,
  'id' | 'content' | 'senderId' | 'createdAt' | 'status'
> & {
  nude?: NudeType;
};
