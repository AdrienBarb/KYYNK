'use client';

import { useGlobalModalStore } from '@/stores/GlobalModalStore';
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
import { usePaymentModalStore } from '@/stores/PaymentModalStore';

const NotEnoughCreditsModal = () => {
  const openPaymentModal = usePaymentModalStore((state) => state.openModal);
  const { openNotEnoughCreditModal, setOpenNotEnoughCreditModal } =
    useGlobalModalStore((state) => state);

  const handleBuyMoreCredits = () => {
    setOpenNotEnoughCreditModal(false);
    openPaymentModal();
  };

  return (
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
          <AlertDialogAction onClick={handleBuyMoreCredits}>
            Buy more credits
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NotEnoughCreditsModal;
