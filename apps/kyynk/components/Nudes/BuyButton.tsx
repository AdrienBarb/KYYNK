import { useUser } from '@/lib/hooks/useUser';
import { Button } from '../ui/Button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/AlertDialog';
import { useState } from 'react';
import { NudeType } from '@/types/nudes';
import useApi from '@/lib/hooks/useApi';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

interface Props {
  nude: NudeType;
}

const BuyButton = ({ nude }: Props) => {
  const { user, refetch } = useUser();
  const { slug } = useParams<{ slug: string }>();
  const [openNotEnoughCreditModal, setOpenNotEnoughCreditModal] =
    useState(false);

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
      <AlertDialog
        open={openNotEnoughCreditModal}
        onOpenChange={setOpenNotEnoughCreditModal}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Not Enough Credits</AlertDialogTitle>
            <AlertDialogDescription>
              You do not have enough credits to buy this nude. Would you like to
              buy more credits?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Buy more credits</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BuyButton;
