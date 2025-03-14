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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { List, Grid } from 'lucide-react';

interface Props {
  initialNudes: NudeWithPermissions[];
  user: FetchedUserType;
}

const UserNudes: FC<Props> = ({ initialNudes, user }) => {
  const { slug } = useParams<{ slug: string }>();
  const { user: loggedUser } = useUser();
  const { useGet } = useApi();
  const [view, setView] = useQueryState('view');
  const [nudeId, setNudeId] = useQueryState('n');
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

  const handleViewChange = (value: string) => {
    setNudeId(null);
    setView(value);
  };

  return (
    <div className="mt-8">
      {!!nudes.length && (
        <div className="flex justify-end">
          <Tabs onValueChange={handleViewChange} value={view ?? 'wall'}>
            <TabsList>
              <TabsTrigger value="wall">
                <Grid size={22} />
              </TabsTrigger>
              <TabsTrigger value="feed">
                <List size={22} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}
      <div className="mt-4">
        {isFeedView ? <FeedView nudes={nudes} /> : <WallView nudes={nudes} />}
      </div>
    </div>
  );
};

export default UserNudes;
