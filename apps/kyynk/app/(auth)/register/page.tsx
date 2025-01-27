import React from 'react';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import UserSignUpForm from '@/components/auth/UserSignUpForm';
import Title from '@/components/Title';
import { appRouter } from '@/constants/appRouter';

const SignUpPage = () => {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center max-w-lg mx-auto px-4 mt-12">
        <div className="mb-12">
          <Title Tag="h3" data-id="sign-up-title">
            Sign Up
          </Title>
        </div>
        <UserSignUpForm />
        <div className="flex flex-col gap-4 w-full my-5">
          <Button asChild variant="secondary">
            <Link href={appRouter.login}>Sign In</Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default SignUpPage;
