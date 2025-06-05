import { genPageMetadata } from '@/app/seo';
import Footer from '@/components/layout/Footer';
import NavigationBar from '@/components/layout/NavigationBar';
import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { appRouter } from '@/constants/appRouter';
import { auth } from '@/auth';
import Feature from '@/components/landing/FeatureWithAdvantages';
import CreatorFAQ from '@/components/landing/CreatorFAQ';

export async function generateMetadata(): Promise<Metadata | undefined> {
  return genPageMetadata({
    title: 'Join the Leading Creator Community',
    description:
      'Become a part of the top creator community. Share your unique content, engage with your audience, and grow your brand like never before.',
  });
}

const Home = async () => {
  const session = await auth();

  return (
    <>
      <NavigationBar type="app" />
      <div className="bg-primary lg:h-[80dvh] flex justify-center items-center mt-16 mx-8 rounded-md px-8 py-16 h-3/4">
        <div className="flex flex-col justify-between items-center gap-16 max-w-5xl w-full">
          <div className="flex flex-col text-center items-center justify-center lg:max-w-lg">
            <h1
              data-id="homepage-title"
              className="text-4xl lg:text-5xl font-bold font-rubik text-secondary"
            >
              Start earning from your videos and private chats.
            </h1>
            <h2 className="text-xl font-light font-karla text-secondary mt-4">
              0% fees for 3 months. Only 10% after.
            </h2>

            <div className="mt-4">
              <Button variant="secondary" asChild>
                <Link href={session ? appRouter.models : appRouter.register}>
                  Start Earning Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Feature />
      <CreatorFAQ />

      <Footer />
    </>
  );
};

export default Home;
