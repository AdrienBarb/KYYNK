import React from 'react';
import PageContainer from '@/components/PageContainer';
import UserForgotPasswordForm from '@/components/UserForgotPasswordForm';
import Title from '@/components/Title';
import SupportContact from '@/components/SupportContact';
import Text from '@/components/ui/Text';

const UserForgotPasswordPage = () => {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center max-w-lg mx-auto px-4 mt-12">
        <div className="mb-12">
          <Title Tag="h3" data-id="forgot-password-title">
            Forgot Password
          </Title>
          <Text className="text-center">Re-initialize your password</Text>
        </div>
        <UserForgotPasswordForm />
      </div>
      <SupportContact />
    </PageContainer>
  );
};

export default UserForgotPasswordPage;
