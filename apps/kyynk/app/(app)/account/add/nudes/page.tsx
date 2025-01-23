import NudeForm from '@/components/nudes/NudeForm';
import Title from '@/components/Title';
import React, { FC } from 'react';

interface CreateNudePageProps {
  params: {
    nudeId: string;
  };
}

const CreateNudePage: FC<CreateNudePageProps> = ({ params: { nudeId } }) => {
  return (
    <div className="max-w-md mx-auto">
      <Title Tag="h2" className="mb-4">
        Create a nude
      </Title>
      <NudeForm />
    </div>
  );
};

export default CreateNudePage;
