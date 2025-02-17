import { useUser } from '@/hooks/users/useUser';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { NudeType } from '@/types/nudes';
import useApi from '@/hooks/requests/useApi';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { appRouter } from '@/constants/appRouter';
import { useRouter } from 'next/navigation';
import NotEnoughCreditsModal from '../modals/NotEnoughCreditsModal';

interface Props {
  nude: NudeType;
}

const BuyButton = ({ nude }: Props) => {
  const { user, refetch } = useUser();
  const { slug } = useParams<{ slug: string }>();
  const [openNotEnoughCreditModal, setOpenNotEnoughCreditModal] =
    useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { usePost } = useApi();
  const { mutate: buyNude, isPending } = usePost(`/api/nudes/${nude.id}/buy`, {
    onSuccess: (boughtNude: NudeType) => {
      refetch();
      queryClient.setQueryData(
        ['get', { url: `/api/users/${slug}/nudes`, params: {} }],
        (oldData: any) => {
          return oldData
            ? oldData.map((item: NudeType) =>
                item.id === boughtNude.id ? boughtNude : item,
              )
            : [boughtNude];
        },
      );
    },
  });

  const handleBuy = () => {
    if (!user) {
      router.push(appRouter.login);
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
      >{`Buy for ${nude.creditPrice} credits`}</Button>
      <NotEnoughCreditsModal
        open={openNotEnoughCreditModal}
        onOpenChange={setOpenNotEnoughCreditModal}
      />
    </>
  );
};

export default BuyButton;
