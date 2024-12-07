'use client';

import BackButton from '@/components/Common/BackButton';
import PageContainer from '@/components/PageContainer';
import { useUser } from '@/lib/hooks/useUser';
import dynamic from 'next/dynamic';
import React from 'react';

const UserForm = dynamic(() => import('@/components/UserForm'), { ssr: false });

const EditProfilPage = () => {
  const { getUser } = useUser();
  const user = getUser();

  return (
    <PageContainer>
      <BackButton isVisible={true} prevPath={`/${user?.slug}`} />
      <UserForm />
    </PageContainer>
  );
};

export default EditProfilPage;
