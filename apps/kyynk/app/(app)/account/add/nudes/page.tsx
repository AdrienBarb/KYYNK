import React, { FC } from 'react';
import CreateNude from '@/components/CreateNude';

interface CreateNudePageProps {
  params: {
    nudeId: string;
  };
}

const CreateNudePage: FC<CreateNudePageProps> = ({ params: { nudeId } }) => {
  return (
    <div className="max-w-screen-sm mx-auto">
      <CreateNude />
    </div>
  );
};

export default CreateNudePage;
