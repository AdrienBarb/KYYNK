'use client';

import React, { useEffect } from 'react';
import AccountVerification from '@/components/AccountVerification';
import toast from 'react-hot-toast';
import useApi from '@/hooks/requests/useApi';
import { useUser } from '@/hooks/users/useUser';
import { isCreator } from '@/utils/users/isCreator';
import AppMessage from '@/components/AppMessage';
import { Button } from '@/components/ui/Button';
import { apiRouter } from '@/constants/apiRouter';
import { isUserVerified } from '@/utils/users/isUserVerified';
import { TelegramShareButton, TwitterShareButton } from 'react-share';

const VerificationPage = () => {
  const { user, refetch } = useUser();
  const { usePut } = useApi();

  const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/${user?.slug}`;

  useEffect(() => {
    refetch();
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(URL);
      toast.success('Link copied to clipboard');
    } catch (error) {
      console.error(error);
    }
  };

  const { mutate: editUserType, isPending } = usePut(apiRouter.me, {
    onSuccess: () => {
      refetch();
    },
  });

  if (isUserVerified({ user })) {
    return (
      <AppMessage
        title="Your profile is verified!"
        text="Share your profile now on your social medias and start building your community."
      >
        <TwitterShareButton
          url={URL}
          title="Come discover this profile on KYYNK"
          style={{ width: '100%' }}
        >
          <Button variant="secondary" className="w-full">
            Share on Twitter
          </Button>
        </TwitterShareButton>
        <TelegramShareButton
          url={URL}
          title="Come discover this profile on KYYNK"
          style={{ width: '100%' }}
        >
          <Button variant="secondary" className="w-full">
            Share on Telegram
          </Button>
        </TelegramShareButton>
        <Button
          onClick={copyToClipboard}
          variant={'secondary'}
          className="w-full"
        >
          Copy my profile link
        </Button>
      </AppMessage>
    );
  }

  if (!isCreator({ user })) {
    return (
      <AppMessage
        title="Want to become a creator?"
        text="Then click on the button below."
      >
        <Button
          onClick={() => editUserType({ userType: 'creator' })}
          isLoading={isPending}
          variant="secondary"
        >
          Become a Creator
        </Button>
      </AppMessage>
    );
  }

  if (isCreator({ user })) {
    return <AccountVerification />;
  }
};

export default VerificationPage;
