import React from 'react';
import { useTranslations } from 'next-intl';
import EmailVerification from '@/components/EmailVerification';
import PaddingContainer from '@/components/PaddingContainer';

const CreatorEmailConfirmationPage = () => {
  const t = useTranslations();

  return (
    <PaddingContainer>
      <EmailVerification
        nextPath={'/dashboard/account/parameters/my-account'}
      />
    </PaddingContainer>
  );
};

export default CreatorEmailConfirmationPage;
