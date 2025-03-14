import React, { FC, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import NudePost from './NudePost';
import { NudeWithPermissions } from '@/types/nudes';

interface Props {
  nudes: NudeWithPermissions[];
}

const FeedView: FC<Props> = ({ nudes }) => {
  const searchParams = useSearchParams();
  const nudeId = searchParams.get('n');
  const nudeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (nudeId && nudeRefs.current[nudeId]) {
      nudeRefs.current[nudeId]?.scrollIntoView({
        behavior: 'auto',
        block: 'center',
      });
    }
  }, [nudeId]);

  return (
    <div className="grid gap-16 mx-auto grid-cols-1 max-w-lg">
      {nudes.map((nude: NudeWithPermissions) => (
        <NudePost
          key={nude.id}
          nude={nude}
          refCallback={(el) => {
            nudeRefs.current[nude.id] = el;
          }}
        />
      ))}
    </div>
  );
};

export default FeedView;
