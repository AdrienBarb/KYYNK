'use client';

import React from 'react';
import VerificationCard from './VerificationCard';
import { useUser } from '@/hooks/users/useUser';
import { appRouter } from '@/constants/appRouter';

const AccountVerification = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-4">
      <VerificationCard
        isValid={!!user?.profileImageId}
        path={appRouter.myProfile}
        label={'Add a profile image'}
      />
      <VerificationCard
        isValid={!!user?.isEmailVerified}
        path={appRouter.becomeCreatorEmail}
        label={'Confirm your email'}
      />
      <VerificationCard
        isValid={user?.identityVerificationStatus === 'verified'}
        path={appRouter.becomeCreatorIdentity}
        label={'Verify your identity'}
      />
    </div>
  );
};

export default AccountVerification;
