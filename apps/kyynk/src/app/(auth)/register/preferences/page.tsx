'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import useApi from '@/hooks/requests/useApi';
import { TAGS } from '@/constants/constants';
import { useRouter } from 'next/navigation';
import { apiRouter } from '@/constants/apiRouter';
import Title from '@/components/ui/Title';
import { Button } from '@/components/ui/Button';
import { appRouter } from '@/constants/appRouter';

const SignUpPage = () => {
  const t = useTranslations();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { usePut } = useApi();
  const router = useRouter();

  const { mutate: editUserPreferences, isPending } = usePut(apiRouter.me, {
    onSuccess: () => {
      router.push(appRouter.models);
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
    <div className="flex flex-col items-center justify-center">
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

      <Button
        className="w-full"
        isLoading={isPending}
        onClick={() => {
          editUserPreferences({ preferences: selectedTags });
        }}
      >
        {t('common.continue')}
      </Button>
    </div>
  );
};

export default SignUpPage;
