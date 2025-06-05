import { genPageMetadata } from '@/app/seo';
import AppFAQ from '@/components/home/AppFAQ';
import Landing from '@/components/home/Landing';
import LandingFeatures from '@/components/home/LandingFeatures';
import Footer from '@/components/layout/Footer';
import NavigationBar from '@/components/layout/NavigationBar';
import ModelOffer from '@/components/home/ModelOffer';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return genPageMetadata({
    title: t('homeTitle'),
    description: t('homeDescription'),
  });
}

const Home = async () => {
  return (
    <>
      <NavigationBar type="app" />
      <Landing />
      <ModelOffer />
      <LandingFeatures />
      <AppFAQ />
      <Footer />
    </>
  );
};

export default Home;
