import React from 'react';
import PageContainer from '@/components/PageContainer';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import UserSignInForm from '@/components/auth/UserSignInForm';
import Title from '@/components/ui/Title';
import { appRouter } from '@/constants/appRouter';

const LoginPage = () => {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-12">
          <Title Tag="h3" data-id="sign-in-title">
            Sign In
          </Title>
        </div>
        <UserSignInForm />
        <div className="flex flex-col gap-4 w-full my-5">
          <Button asChild variant="secondary">
            <Link href={appRouter.register}>Sign Up</Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="text-sm text-primary font-light"
          >
            <Link href={appRouter.forgotPassword}>Forgot Password</Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default LoginPage;
