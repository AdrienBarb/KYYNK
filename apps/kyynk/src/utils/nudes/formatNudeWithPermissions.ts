import { NudeType } from '@/types/nudes';

export const formatNudeWithPermissions = (
  nude: NudeType,
  connectedUserId: string | undefined,
) => {
  const isFree = nude.creditPrice === 0;
  const isConnectedUserBoughtTheNude =
    connectedUserId && nude.buyers.includes(connectedUserId);
  const isOwner = nude.userId === connectedUserId;

  const canView = isFree || isConnectedUserBoughtTheNude;
  const canEdit = isOwner;
  const canBuy = !isOwner && !isConnectedUserBoughtTheNude && !isFree;

  return {
    ...nude,
    media: {
      ...nude.media,
      videoId: canView ? nude.media.videoId : null,
    },
    permissions: {
      canView,
      canEdit,
      canBuy,
    },
  };
};
