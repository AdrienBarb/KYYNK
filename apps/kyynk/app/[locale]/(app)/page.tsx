import { genPageMetadata } from '@/app/seo';
import { appRouter } from '@/appRouter';
import { auth } from '@/auth';
import { client } from '@/client';
import AppFAQ from '@/components/AppFAQ';
import Footer from '@/components/Footer';
import Landing from '@/components/Landing';
import LandingFeatures from '@/components/LandingFeatures';
import LastArticleHomeSection from '@/components/LastArticleHomeSection';
import LastUsersHomeSection from '@/components/LastUsersHomeSection';
import ModelOffer from '@/components/ModelOffer';
import userService from '@/features/user/userService';
import { redirect } from '@/navigation';
import { Metadata } from 'next';
import { useSession } from 'next-auth/react';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata | undefined> {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return genPageMetadata({
    title: t('homeTitle'),
    description: t('homeDescription'),
  });
}

const Home = async ({ params: { locale } }: { params: { locale: string } }) => {
  // const { users } = await userService.getAllUsers({});

  return (
    <>
      <Landing />
      <ModelOffer />
      <LandingFeatures />
      {/* <LastUsersHomeSection users={users} /> */}
      <AppFAQ />
      <Footer />
    </>
  );
};

export default Home;
