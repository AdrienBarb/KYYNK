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

interface NotEnoughCreditsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NotEnoughCreditsModal = ({
  open,
  onOpenChange,
}: NotEnoughCreditsModalProps) => {
  const openPaymentModal = usePaymentModalStore((state) => state.openModal);

  const handleBuyMoreCredits = () => {
    onOpenChange(false);
    openPaymentModal();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
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
