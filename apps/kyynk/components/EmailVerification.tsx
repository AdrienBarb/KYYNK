'use client';

import React, { FC, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from './ui/Button'; // Import the default Button
import useApi from '@/lib/hooks/useApi';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/hooks/useUser';
import { appRouter } from '@/constants/appRouter';
import { Input } from './ui/Input'; // Import the Input component

const VerificationCodeButton = ({}) => {
  const [code, setCode] = useState('');
  const router = useRouter();
  const { refetch } = useUser();

  const { usePost } = useApi();

  const { mutate: verifyVerificationCode, isPending } = usePost(
    `/api/me/emails/verify-code`,
    {
      onSuccess: () => {
        refetch();
        router.push(appRouter.becomeCreator);
      },
    },
  );

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleVerifyCode = () => {
    if (!code) {
      return;
    }

    verifyVerificationCode({ code });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <Input
        type="text"
        placeholder="Verification Code"
        value={code}
        onChange={handleCodeChange}
        className="w-full"
      />

      <Button
        onClick={handleVerifyCode}
        disabled={!code}
        isLoading={isPending}
        className="w-full"
        variant="default"
      >
        Confirm Code
      </Button>
    </div>
  );
};

const EmailVerification = () => {
  const { data: session } = useSession();
  const [isCodeSended, setIsCodeSended] = useState(false);

  const { usePost } = useApi();

  const { mutate: sendVerificationCode, isPending } = usePost(
    `/api/me/emails/send-verification-code`,
    {
      onSuccess: () => {
        setIsCodeSended(true);
      },
    },
  );

  const handleSendCode = async () => {
    sendVerificationCode({});
  };

  return (
    <div className="w-full">
      {isCodeSended ? (
        <div className="flex flex-col gap-4 items-center">
          <div className="text-center">
            We have sent a code to your email: {session?.user?.email}
          </div>
          <VerificationCodeButton />
          <div>
            Didn&apos;t receive the code?{' '}
            <span
              className="cursor-pointer underline"
              onClick={() => setIsCodeSended(false)}
            >
              Send it again
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <div>Please enter the verification code sent to your email.</div>
          <Button
            onClick={handleSendCode}
            isLoading={isPending}
            className="w-full"
            variant="default"
          >
            Send Code
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
