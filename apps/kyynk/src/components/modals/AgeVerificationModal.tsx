'use client';

import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/AlertDialog';
import Text from '../ui/Text';

const AgeVerificationModal = () => {
  const [shouldOpen, setShouldOpen] = useState<boolean>(false);

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified') === 'true';
    setShouldOpen(!verified);
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('ageVerified', 'true');
    setShouldOpen(false);
  };

  const handleCancel = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <AlertDialog open={shouldOpen}>
      <AlertDialogContent className="max-w-xl overflow-y-scroll">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            This is a website intended for adults
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Text className="text-center">
          This website contains age-restricted material, including nudity and
          explicit depictions of sexual activity. By signing up, you affirm that
          you are at least 18 years old or the age of majority in the
          jurisdiction from which you access the website and that you consent to
          viewing sexually explicit content.
        </Text>
        <AlertDialogFooter className="flex flex-col sm:flex-row items-center justify-between sm:justify-between gap-4">
          <AlertDialogAction
            onClick={handleConfirm}
            variant="default"
            className="w-full"
          >
            I am 18 or older - Enter
          </AlertDialogAction>
          <AlertDialogCancel onClick={handleCancel} className="w-full">
            I am under 18 - Exit
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AgeVerificationModal;
