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

interface NotEnoughCreditsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NotEnoughCreditsModal = ({
  open,
  onOpenChange,
}: NotEnoughCreditsModalProps) => {
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
          <AlertDialogAction>Buy more credits</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NotEnoughCreditsModal;
