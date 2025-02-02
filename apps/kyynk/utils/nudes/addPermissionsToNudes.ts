import { NudeType } from '@/types/nudes';

export const addPermissionsToNudes = (
  nudes: NudeType[],
  connectedUserId: string | undefined,
) => {
  return nudes.map((nude) => {
    const canManage = nude.userId === connectedUserId;
    const canView = nude.creditPrice === 0;
    const canEdit = canManage;
    const canBuy = false;

    return {
      ...nude,
      permissions: {
        canView,
        canEdit,
        canBuy,
        canManage,
      },
    };
  });
};
