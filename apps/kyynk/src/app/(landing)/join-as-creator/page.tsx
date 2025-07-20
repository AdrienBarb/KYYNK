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
import { getUsers } from '@/services/users/getUsers';
import LastCreators from '@/components/landing/LastCreators';
import { User } from '@prisma/client';

export async function generateMetadata(): Promise<Metadata | undefined> {
  return genPageMetadata({
    title: 'Join the Leading Creator Community',
    description:
      'Become a part of the top creator community. Share your unique content, engage with your audience, and grow your brand like never before.',
  });
}

const Home = async () => {
  const session = await auth();

  const lastCreators = (await getUsers({ limit: 8 })) as User[];

  return (
    <>
      <NavigationBar type="app" />
      <div className="bg-primary lg:h-[80dvh] flex justify-center items-center mt-16 mx-4 rounded-md px-8 py-16 h-3/4">
        <div className="flex flex-col justify-between items-center gap-16 max-w-5xl w-full">
          <div className="flex flex-col text-center items-center justify-center lg:max-w-lg">
            <h1
              data-id="homepage-title"
              className="text-4xl lg:text-5xl font-bold font-rubik text-secondary"
            >
              Start earning from your videos and private chats.
            </h1>
            <h2 className="text-xl font-normal font-karla text-secondary mt-4">
              Sign up before the end of the month and earn 100% of your
              earnings.
            </h2>

            <div className="mt-4">
              <Button variant="secondary" asChild>
                <Link href={session ? appRouter.home : appRouter.register}>
                  Start Earning Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <LastCreators lastCreators={lastCreators} />
      <Feature />
      <CreatorFAQ />

      <Footer />
    </>
  );
};

export default Home;
