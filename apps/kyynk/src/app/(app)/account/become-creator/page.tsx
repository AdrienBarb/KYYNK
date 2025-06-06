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
import LinkIcon from '@mui/icons-material/Link';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import Text from '@/components/ui/Text';
import Link from 'next/link';

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
        text="Here is the next step"
        emoji="🎉"
      >
        <div className="mb-8 flex flex-col items-center gap-4">
          <Text className="text-center text-lg font-bold max-w-md">
            Join our private Telegram group to connect with other creators, get
            tips, and chat directly with the KYYNK team.
          </Text>
          <Button asChild>
            <Link target="_blank" href="https://t.me/+ApoqYZr0s0E2ZjI0">
              Join us now!
            </Link>
          </Button>
        </div>
        <div>
          <Text className="text-center text-lg mb-4 font-bold max-w-md">
            Share your profile now on your social medias and start building your
            community.
          </Text>
          <div className="flex justify-center items-center gap-8">
            <TwitterShareButton
              url={URL}
              title="Come discover this profile on KYYNK"
            >
              <div className="flex flex-col items-center gap-2 cursor-pointer">
                <div className="bg-primary w-10 h-10 flex items-center justify-center rounded-full">
                  <TwitterIcon sx={{ color: '#FFF0EB' }} />
                </div>
                <p className="font-karla font-light text-xs text-custom-black">
                  Twitter
                </p>
              </div>
            </TwitterShareButton>
            <TelegramShareButton
              url={URL}
              title="Come discover this profile on KYYNK"
            >
              <div className="flex flex-col items-center gap-2 cursor-pointer">
                <div className="bg-primary w-10 h-10 flex items-center justify-center rounded-full">
                  <TelegramIcon sx={{ color: '#FFF0EB' }} />
                </div>
                <p className="font-karla font-light text-xs text-custom-black">
                  Telegram
                </p>
              </div>
            </TelegramShareButton>
            <div
              className="flex flex-col items-center gap-2 cursor-pointer"
              onClick={copyToClipboard}
            >
              <div className="bg-primary w-10 h-10 flex items-center justify-center rounded-full">
                <LinkIcon sx={{ color: '#FFF0EB' }} />
              </div>
              <p className="font-karla font-light text-xs text-custom-black">
                Link
              </p>
            </div>
          </div>
        </div>
      </AppMessage>
    );
  }

  if (!isCreator({ user })) {
    return (
      <AppMessage
        title="Want to become a creator?"
        text="Then click on the button below."
        emoji="🔥"
      >
        <Button
          onClick={() => editUserType({ userType: 'creator' })}
          isLoading={isPending}
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
