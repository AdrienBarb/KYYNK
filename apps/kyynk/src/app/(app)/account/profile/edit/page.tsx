import { auth } from '@/auth';
import PageContainer from '@/components/PageContainer';
import UserForm from '@/components/UserForm';
import { redirect } from 'next/navigation';
import React from 'react';

const EditProfilPage = async () => {
  const session = await auth();
  console.log('🚀 ~ EditProfilPage ~ session:', session);

  if (!session) {
    redirect('/login');
  }

  return (
    <PageContainer>
      <UserForm />
    </PageContainer>
  );
};

export default EditProfilPage;
