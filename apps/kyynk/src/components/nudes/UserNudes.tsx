'use client';

import React, { FC } from 'react';
import { useParams } from 'next/navigation';
import useApi from '@/hooks/requests/useApi';
import FeedView from './FeedView';
import WallView from './WallView';
import { useUser } from '@/hooks/users/useUser';
import { isUserVerified } from '@/utils/users/isUserVerified';
import { FetchedUserType } from '@/types/users';
import { useQueryState } from 'nuqs';
import { NudeWithPermissions } from '@/types/nudes';

interface Props {
  initialNudes: NudeWithPermissions[];
  user: FetchedUserType;
}

const UserNudes: FC<Props> = ({ initialNudes, user }) => {
  const { slug } = useParams<{ slug: string }>();
  const { user: loggedUser } = useUser();
  const { useGet } = useApi();
  const [view] = useQueryState('view');
  const isFeedView = view === 'feed';

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
