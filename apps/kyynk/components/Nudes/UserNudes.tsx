'use client';

import React, { FC } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import useApi from '@/lib/hooks/useApi';
import FeedView from './FeedView';
import WallView from './WallView';
import { NudeType } from '@/types/nudes';

interface Props {
  initialNudes: NudeType[];
}

const UserNudes: FC<Props> = ({ initialNudes }) => {
  const { slug } = useParams<{ slug: string }>();
  const { useGet } = useApi();
  const searchParams = useSearchParams();
  const isFeedView = searchParams.get('view') === 'feed';

  const { data: nudes } = useGet(
    `/api/users/${slug}/nudes`,
    {},
    {
      initialData: initialNudes,
      refetchOnWindowFocus: true,
    },
  );

  console.log('🚀 ~ nudes:', nudes);

  return isFeedView ? <FeedView nudes={nudes} /> : <WallView nudes={nudes} />;
};

export default UserNudes;
