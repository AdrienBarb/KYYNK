import { Message, Nude, Media } from '@prisma/client';

export type MessageType = Pick<
  Message,
  'id' | 'content' | 'senderId' | 'createdAt' | 'status'
> & {
  nude?: Pick<Nude, 'id' | 'creditPrice'> & {
    media: Pick<Media, 'id' | 'thumbnailId' | 'videoId'>;
  };
};
