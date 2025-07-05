import { useUser } from '@/hooks/users/useUser';
import { Button } from '../ui/Button';
import useApi from '@/hooks/requests/useApi';
import { appRouter } from '@/constants/appRouter';
import { useRouter } from 'next/navigation';
import { formatCredits } from '@/utils/prices/formatCredits';
import { NudeWithPermissions } from '@/types/nudes';
import { getEncodedFullUrl } from '@/utils/links/getEncodedFullUrl';
import { useGlobalModalStore } from '@/stores/GlobalModalStore';

interface Props {
  nude: NudeWithPermissions;
  afterBuyAction: (nude: NudeWithPermissions) => void;
}

const BuyButton = ({ nude, afterBuyAction }: Props) => {
  const { user, refetch } = useUser();
  const { setOpenNotEnoughCreditModal } = useGlobalModalStore((state) => state);
  const router = useRouter();

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
    <Button
      onClick={handleBuy}
      isLoading={isPending}
      disabled={isPending}
    >{`Buy for ${formatCredits(nude.creditPrice)} credits`}</Button>
  );
};

export default BuyButton;
