'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';
import { useUser } from '@/lib/hooks/useUser';
import { isCreator } from '@/utils/users/isCreator';
import { isUserVerified } from '@/utils/users/isUserVerified';
import { Button } from '@/components/ui/Button';
import { appRouter } from '@/constants/appRouter';

const UserUncompletedProfileBanner = () => {
  const { user } = useUser();
  const { slug } = useParams<{ slug: string }>();

  if (
    user &&
    user?.slug === slug &&
    isCreator({ user }) &&
    !isUserVerified({ user })
  ) {
    return (
      <Alert
        variant="default"
        className="mb-4 flex justify-between bg-primary text-secondary"
      >
        <div>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You must complete your profile for it to be visible to other users.
          </AlertDescription>
        </div>
        <Button variant="secondary" asChild className="text-custom-black">
          <Link href={appRouter.becomeCreator}>Complete my profile</Link>
        </Button>
      </Alert>
    );
  }

  return null;
};

export default UserUncompletedProfileBanner;
