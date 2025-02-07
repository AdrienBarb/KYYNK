'use client';

import React, { FC } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import useApi from '@/lib/hooks/useApi';
import FeedView from './FeedView';
import WallView from './WallView';
import { NudeType } from '@/types/nudes';
import { useUser } from '@/lib/hooks/useUser';
import { isUserVerified } from '@/utils/users/isUserVerified';
import { FetchedUserType } from '@/types/users';

interface Props {
  initialNudes: NudeType[];
  user: FetchedUserType;
}

const UserNudes: FC<Props> = ({ initialNudes, user }) => {
  const { slug } = useParams<{ slug: string }>();
  const { user: loggedUser } = useUser();
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

  if (loggedUser?.slug !== slug && !isUserVerified({ user })) {
    return null;
  }

  return isFeedView ? <FeedView nudes={nudes} /> : <WallView nudes={nudes} />;
};

export default UserNudes;
