import React from 'react';
import PageContainer from '@/components/PageContainer';
import UserResetPasswordForm from '@/components/UserResetPasswordForm';
import Title from '@/components/ui/Title';
import Text from '@/components/ui/Text';

const UserResetPasswordPage = () => {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center max-w-lg mx-auto px-4 mt-12">
        <div className="mb-12">
          <Title
            Tag="h3"
            data-id="reset-password-title"
            className="text-center"
          >
            Forgot Password
          </Title>
          <Text className="text-center">Please enter your new password.</Text>
        </div>
        <UserResetPasswordForm />
      </div>
    </PageContainer>
  );
};

export default UserResetPasswordPage;
