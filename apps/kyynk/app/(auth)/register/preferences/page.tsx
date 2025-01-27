'use client';

import React, { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { useTranslations } from 'next-intl';
import FullButton from '@/components/Buttons/FullButton';
import useApi from '@/lib/hooks/useApi';
import { TAGS } from '@/constants/constants';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/hooks/useUser';
import { apiRouter } from '@/constants/apiRouter';
import Title from '@/components/Title';

const SignUpPage = () => {
  const t = useTranslations();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { usePut } = useApi();
  const router = useRouter();

  const { getUser } = useUser();
  const user = getUser();

  const { mutate: editUserPreferences, isPending } = usePut(apiRouter.me, {
    onSuccess: () => {
      router.push(`/${user?.slug}`);
    },
  });

  const handleTagSelection = (tag: string) => {
    let clonedSelectedTags = [...selectedTags];

    if (clonedSelectedTags.includes(tag)) {
      clonedSelectedTags = [...clonedSelectedTags.filter((t) => t !== tag)];
    } else {
      clonedSelectedTags = [...clonedSelectedTags, tag];
    }

    setSelectedTags(clonedSelectedTags);
  };

  return (
    <PageContainer>
      <div className="max-w-lg mx-auto mt-12 flex flex-col items-center justify-center">
        <Title Tag="h3" data-id="user-type-title" className="mb-12">
          {t('common.whatPreferences')}
        </Title>

        <div className="flex flex-wrap p-4 gap-4 mb-12 border border-neutral-200 w-full rounded-md">
          {TAGS.map((currentTag, index) => {
            return (
              <div
                key={index}
                onClick={() => handleTagSelection(currentTag.value)}
                className={`text-center lg:w-fit border border-neutral-200 rounded-md p-2 cursor-pointer hover:border-neutral-200 hover:bg-neutral-200 ${
                  selectedTags.includes(currentTag.value)
                    ? 'bg-primary border-primary'
                    : ''
                }`}
              >
                {t(`nudeCategories.${currentTag.label}`)}
              </div>
            );
          })}
        </div>

        <FullButton
          customStyles={{ width: '100%' }}
          isLoading={isPending}
          onClick={() => {
            editUserPreferences({ preferences: selectedTags });
          }}
        >
          {t('common.continue')}
        </FullButton>
      </div>
    </PageContainer>
  );
};

export default SignUpPage;
