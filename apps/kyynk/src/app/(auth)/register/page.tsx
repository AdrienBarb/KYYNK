import React from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import UserSignUpForm from '@/components/auth/UserSignUpForm';
import Title from '@/components/ui/Title';
import { appRouter } from '@/constants/appRouter';

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
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
  );
};

export default SignUpPage;
