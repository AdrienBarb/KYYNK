import { auth } from '@/auth';
import PaddingContainer from '@/components/layout/PaddingContainer';
import NudeForm from '@/components/nudes/NudeForm';
import Title from '@/components/ui/Title';
import { getNudeById } from '@/services/nudes/getNudesById';
import { redirect } from 'next/navigation';
import React, { FC } from 'react';

interface Props {
  params: {
    id: string;
  };
}

const CreateNudePage: FC<Props> = async ({ params: { id: nudeId } }) => {
  const session = await auth();

  const nude = await getNudeById({ nudeId });

  if (!nude || nude.userId !== session?.user.id) {
    redirect('/');
  }

  return (
    <PaddingContainer className="max-w-md mx-auto">
      <Title Tag="h2" className="mb-4">
        Edit a nude
      </Title>
      <NudeForm nude={nude} />
    </PaddingContainer>
  );
};

export default CreateNudePage;
