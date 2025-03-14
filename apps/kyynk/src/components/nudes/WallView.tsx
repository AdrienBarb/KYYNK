import React, { FC } from 'react';
import { cn } from '@/utils/tailwind/cn';
import NudeCard from './NudeCard';
import { useQueryState } from 'nuqs';
import { NudeWithPermissions } from '@/types/nudes';

interface Props {
  nudes: NudeWithPermissions[];
}

const WallView: FC<Props> = ({ nudes }) => {
  const [view, setView] = useQueryState('view');
  const [nudeId, setNudeId] = useQueryState('n');

  const handleNudeClick = (nudeId: string) => {
    setView('feed');
    setNudeId(nudeId);
  };

  return (
    <div className={cn('grid gap-4', 'grid-cols-2 lg:grid-cols-3')}>
      {nudes.map((nude: NudeWithPermissions) => (
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
