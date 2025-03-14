import { useUser } from '@/hooks/users/useUser';
import { Button } from '../ui/Button';
import { useState } from 'react';
import useApi from '@/hooks/requests/useApi';
import { appRouter } from '@/constants/appRouter';
import { useRouter, usePathname } from 'next/navigation';
import NotEnoughCreditsModal from '../modals/NotEnoughCreditsModal';
import { formatCredits } from '@/utils/prices/formatCredits';
import { NudeWithPermissions } from '@/types/nudes';
import { getEncodedFullUrl } from '@/utils/links/getEncodedFullUrl';

interface Props {
  nude: NudeWithPermissions;
  afterBuyAction: (nude: NudeWithPermissions) => void;
}

const BuyButton = ({ nude, afterBuyAction }: Props) => {
  const { user, refetch } = useUser();
  const [openNotEnoughCreditModal, setOpenNotEnoughCreditModal] =
    useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { usePost } = useApi();
  const { mutate: buyNude, isPending } = usePost(`/api/nudes/${nude.id}/buy`, {
    onSuccess: (boughtNude: NudeWithPermissions) => {
      refetch();
      afterBuyAction(boughtNude);
    },
  });

  const handleBuy = () => {
    if (!user) {
      const encodedUrl = getEncodedFullUrl();
      router.push(`${appRouter.login}?previousUrl=${encodedUrl}`);
      return;
    }

    if (user.creditsAmount < nude.creditPrice) {
      setOpenNotEnoughCreditModal(true);
      return;
    }

    buyNude({});
  };

  return (
    <>
      <Button
        onClick={handleBuy}
        isLoading={isPending}
      >{`Buy for ${formatCredits(nude.creditPrice)} credits`}</Button>
      <NotEnoughCreditsModal
        open={openNotEnoughCreditModal}
        onOpenChange={setOpenNotEnoughCreditModal}
      />
    </>
  );
};

export default BuyButton;
