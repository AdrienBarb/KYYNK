import { auth } from '@/auth';
import PaddingContainer from '@/components/layout/PaddingContainer';
import UserForm from '@/components/UserForm';
import { redirect } from 'next/navigation';
import React from 'react';

const EditProfilPage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <PaddingContainer>
      <UserForm />
    </PaddingContainer>
  );
};

export default EditProfilPage;
