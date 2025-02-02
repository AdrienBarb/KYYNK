import { Nude, User, Media } from '@prisma/client';

export type NudeType = Pick<
  Nude,
  'id' | 'description' | 'creditPrice' | 'userId' | 'createdAt'
> & {
  media: Pick<Media, 'id' | 'thumbnailId' | 'videoId'>;
  user: Pick<User, 'id' | 'pseudo' | 'profileImageId'>;
  permissions: {
    canView: boolean;
    canEdit: boolean;
    canBuy: boolean;
    canManage: boolean;
  };
};
