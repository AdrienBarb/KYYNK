import AgeVerificationModal from '@/components/modals/AgeVerificationModal';
import PaymentModal from '@/components/modals/PaymentModal';
import NudeCreationModal from '@/components/modals/NudeCreationModal';
import NotEnoughCreditsModal from '@/components/modals/NotEnoughCreditsModal';

const ModalWrapper = () => {
  return (
    <>
      {/* <AgeVerificationModal /> */}
      <PaymentModal />
      <NudeCreationModal />
      <NotEnoughCreditsModal />
    </>
  );
};

export default ModalWrapper;
