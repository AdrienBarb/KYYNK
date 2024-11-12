'use client';

import React, { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { useTranslations } from 'next-intl';
import { getSession, useSession } from 'next-auth/react';
import useApi from '@/lib/hooks/useApi';
import { appRouter } from '@/appRouter';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Ui/Button';

const SignUpPage = () => {
  const t = useTranslations();
  const [userType, setUserType] = useState('');
  const { update } = useSession();

  const { usePut } = useApi();

  const router = useRouter();

  const { mutate: editUserType, isLoading } = usePut(`/api/me`, {
    onSuccess: async ({ userType }) => {
      const session = await getSession();

      if (session) {
        const updatedSession = {
          ...session,
          user: {
            ...session.user,
            userType: userType,
          },
        };

        await update(updatedSession);

        userType === 'member'
          ? router.push(appRouter.preferences)
          : router.push(`/${session?.user?.slug}`);
      }
    },
  });

  return (
    <PageContainer>
      <div className="max-w-lg mx-auto">
        <h2 className="font-rubik text-xl font-semibold mb-16 mx-auto w-full text-center">
          {t('common.whatKindOfUser')}
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-12">
          <div
            onClick={() => setUserType('creator')}
            className={`flex flex-col w-full lg:w-fit border border-neutral-200 rounded-md p-8 text-center cursor-pointer hover:border-primary-light hover:bg-primary-light ${
              userType === 'creator' ? 'bg-primary border-primary' : ''
            }`}
          >
            <h3 className="font-karla font-medium text-lg">
              {t('common.creator')}
            </h3>
            <p>{t('common.creatorTypeText')}</p>
          </div>

          <div
            onClick={() => setUserType('member')}
            className={`flex flex-col w-full lg:w-fit border border-neutral-200 rounded-md p-8 text-center cursor-pointer hover:border-primary-light hover:bg-primary-light ${
              userType === 'member' && 'bg-primary border-primary'
            }`}
          >
            <h3 className="font-karla font-medium text-lg">
              {t('common.buyer')}
            </h3>
            <p>{t('common.buyerTypeText')}</p>
          </div>
        </div>

        <Button
          disabled={!userType}
          isLoading={isLoading}
          onClick={() => {
            editUserType({ userType });
          }}
          className="w-full"
        >
          {t('common.continue')}
        </Button>
      </div>
    </PageContainer>
  );
};

export default SignUpPage;
