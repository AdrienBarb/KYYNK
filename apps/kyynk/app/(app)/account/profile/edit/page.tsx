'use client';

import PageContainer from '@/components/PageContainer';
import dynamic from 'next/dynamic';
import React from 'react';

const UserForm = dynamic(() => import('@/components/UserForm'), { ssr: false });

const EditProfilPage = () => {
  return (
    <PageContainer>
      <UserForm />
    </PageContainer>
  );
};

export default EditProfilPage;
