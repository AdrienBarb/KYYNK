import React from 'react';
import { useTranslations } from 'next-intl';
import LandingHeader from '@/components/home/LandingHeader';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const ModelOffer = () => {
  const t = useTranslations();

  return (
    <section className="max-w-4xl mx-auto py-20 px-4 flex flex-col items-center">
      <LandingHeader
        title={t('home.youreModel')}
        description={t('home.modelOffer')}
      />
      <Button asChild>
        <Link href="/register">{t('common.signUp')}</Link>
      </Button>
    </section>
  );
};

export default ModelOffer;
