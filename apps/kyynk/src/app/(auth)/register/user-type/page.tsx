'use client';

import React, { useState } from 'react';
import useApi from '@/hooks/requests/useApi';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useUser } from '@/hooks/users/useUser';
import { appRouter } from '@/constants/appRouter';
import { apiRouter } from '@/constants/apiRouter';
import Title from '@/components/ui/Title';
import { User } from '@/generated/prisma';

const SignUpPage = () => {
  const [userType, setUserType] = useState('');

  const { refetch, user } = useUser();

  const { usePut } = useApi();

  const router = useRouter();

  const { mutate: editUserType, isPending } = usePut(apiRouter.me, {
    onSuccess: async ({ userType }: Pick<User, 'userType'>) => {
      refetch();

      userType === 'member'
        ? router.push(appRouter.preferences)
        : router.push(`/${user?.slug}`);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <Title Tag="h3" data-id="user-type-title" className="mb-12">
        What kind of user are you?
      </Title>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-12 w-full">
        <div
          onClick={() => setUserType('creator')}
          className={`flex flex-col w-full border border-neutral-200 rounded-md p-8 text-center cursor-pointer hover:border-primary-light hover:bg-primary-light ${
            userType === 'creator' ? 'bg-primary border-primary' : ''
          }`}
        >
          <h3 className="font-karla font-medium text-lg">Creator</h3>
          <p>Are you more of a content creator?</p>
        </div>

        <div
          onClick={() => setUserType('member')}
          className={`flex flex-col w-full border border-neutral-200 rounded-md p-8 text-center cursor-pointer hover:border-primary-light hover:bg-primary-light ${
            userType === 'member' && 'bg-primary border-primary'
          }`}
        >
          <h3 className="font-karla font-medium text-lg">Buyer</h3>
          <p>Or are you here to watch and enjoy?</p>
        </div>
      </div>

      <Button
        disabled={!userType}
        isLoading={isPending}
        onClick={() => {
          editUserType({ userType });
        }}
        className="w-full"
      >
        Continue
      </Button>
    </div>
  );
};

export default SignUpPage;
