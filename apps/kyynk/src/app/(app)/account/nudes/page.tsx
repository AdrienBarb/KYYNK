import PaddingContainer from '@/components/layout/PaddingContainer';
import NudeForm from '@/components/nudes/NudeForm';
import Title from '@/components/ui/Title';
import React, { FC } from 'react';

const CreateNudePage = () => {
  return (
    <PaddingContainer className="max-w-md mx-auto">
      <Title Tag="h2" className="mb-4">
        Create a nude
      </Title>
      <NudeForm />
    </PaddingContainer>
  );
};

export default CreateNudePage;
