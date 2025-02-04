import React from 'react';
import { Button } from './ui/Button';
import Link from 'next/link';
import { appRouter } from '@/constants/appRouter';
import { auth } from '@/auth';

const Landing = async () => {
  const session = await auth();

  return (
    <div className="bg-primary lg:h-[80dvh] flex justify-center items-center mt-16 mx-8 rounded-md px-8 py-16 h-3/4">
      <div className="flex flex-col justify-between items-center gap-16 max-w-5xl w-full">
        <div className="flex flex-col text-center items-center justify-center lg:max-w-lg">
          <h1
            data-id="homepage-title"
            className="text-4xl lg:text-5xl font-bold font-rubik text-secondary"
          >
            GET CLOSER THAN EVER TO THE HOTTEST CREATORS
          </h1>
          <h2 className="text-xl font-light font-karla text-secondary">
            Unlock and enjoy exclusive content, connect directly with creators,
            and more.
          </h2>

          <div className="mt-4">
            <Button variant="secondary" asChild>
              <Link href={session ? appRouter.models : appRouter.login}>
                Let&apos;s get nasty
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
