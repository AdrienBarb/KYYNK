import { Nude, User, Media } from '@prisma/client';

export type NudeType = Pick<
  Nude,
  'id' | 'description' | 'creditPrice' | 'userId' | 'buyers' | 'createdAt'
> & {
  media: Pick<Media, 'id' | 'thumbnailId' | 'videoId'>;
  user: Pick<User, 'id' | 'pseudo' | 'profileImageId' | 'slug'>;
  permissions: {
    canView: boolean;
    canEdit: boolean;
    canBuy: boolean;
  };
};
