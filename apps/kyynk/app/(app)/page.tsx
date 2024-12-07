import { genPageMetadata } from '@/app/seo';
import AppFAQ from '@/components/AppFAQ';
import Footer from '@/components/Footer';
import Landing from '@/components/Landing';
import LandingFeatures from '@/components/LandingFeatures';
import ModelOffer from '@/components/ModelOffer';
import { Metadata } from 'next';
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

const Home = async () => {
  // const { users } = await userService.getAllUsers({});

  return (
    <>
      <Landing />
      <ModelOffer />
      <LandingFeatures />
      {/* <LastUsersHomeSection users={users} /> */}
      <AppFAQ />
    </>
  );
};

export default Home;
