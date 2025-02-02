import React, { FC } from 'react';
import { Nude } from '@prisma/client';
import { cn } from '@/utils/tailwind/cn';
import NudeCard from './NudeCard';
import { useRouter } from 'next/navigation';

interface Props {
  nudes: Nude[];
}

const WallView: FC<Props> = ({ nudes }) => {
  const router = useRouter();

  const handleNudeClick = (nudeId: string) => {
    router.push(`?view=feed&n=${nudeId}`);
  };

  return (
    <div
      className={cn(
        'grid gap-4 mx-auto mt-8',
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-screen-lg',
      )}
    >
      {nudes.map((nude: Nude) => (
        <NudeCard
          key={nude.id}
          nude={nude}
          onClick={() => handleNudeClick(nude.id)}
        />
      ))}
    </div>
  );
};

export default WallView;
