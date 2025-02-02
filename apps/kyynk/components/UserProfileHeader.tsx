'use client';

import React, { FC } from 'react';
import { useParams } from 'next/navigation';
import { User } from '@prisma/client';
import useApi from '@/lib/hooks/useApi';
import Avatar from './ui/Avatar';
import Title from './Title';
import Text from '@/components/ui/Text';
import OnlineStatus from '@/components/profile/OnlineStatus';

interface Props {
  initialUserDatas: User;
}

const UserProfileHeader: FC<Props> = ({ initialUserDatas }) => {
  const { slug } = useParams<{ slug: string }>();

  const { useGet } = useApi();

  const { data: user } = useGet(
    `/api/users/${slug}`,
    {},
    {
      initialData: initialUserDatas,
      refetchOnWindowFocus: true,
    },
  );

  return (
    <div className="flex flex-col items-center relative w-full box-border text-black gap-4">
      <Avatar size={164} imageId={user?.profileImageId} pseudo={user?.pseudo} />
      <div className="flex flex-col items-center gap-2 w-full">
        <Title Tag="h2" dataId="user-pseudo">
          {user.pseudo}
        </Title>
        <div>
          <Text className="mt-2 text-center">{user.description}</Text>
          <OnlineStatus currentUser={user} />
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
