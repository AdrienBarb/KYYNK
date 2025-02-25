import PaddingContainer from '@/components/layout/PaddingContainer';
import NudeForm from '@/components/nudes/NudeForm';
import PageHeader from '@/components/layout/PageHeader';
import React, { FC } from 'react';

const CreateNudePage = () => {
  return (
    <PaddingContainer className="max-w-md mx-auto">
      <PageHeader title="Create a nude" />
      <NudeForm />
    </PaddingContainer>
  );
};

export default CreateNudePage;
