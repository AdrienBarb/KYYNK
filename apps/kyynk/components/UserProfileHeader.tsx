'use client';

import React, { FC, useState } from 'react';
import { useParams } from 'next/navigation';
import { User } from '@prisma/client';
import { useTranslations } from 'next-intl';
import useApi from '@/lib/hooks/useApi';
import Avatar from './ui/Avatar';
import Title from './Title';
import Text from './Text';
import OnlineStatus from '@/components/profile/OnlineStatus';

interface Props {
  initialUserDatas: User;
}

const UserProfileHeader: FC<Props> = ({ initialUserDatas }) => {
  const [currentUser, setCurrentUser] = useState(initialUserDatas);

  const { slug } = useParams<{ slug: string }>();
  const t = useTranslations();

  const { useGet } = useApi();

  useGet(
    `/api/users/${slug}`,
    {},
    {
      initialData: initialUserDatas,
      onSuccess: (data) => {
        setCurrentUser(data);
      },
    },
  );

  return (
    <div className="flex flex-col items-center relative w-full box-border text-black gap-4">
      <Avatar
        size="l"
        imageId={currentUser?.profileImageId}
        pseudo={currentUser?.pseudo}
      />
      <div className="flex flex-col items-center gap-2 w-full">
        <Title Tag="h2" dataId="user-pseudo">
          {currentUser.pseudo}
        </Title>
        <Text className="mt-2 text-center">{currentUser.description}</Text>
        <OnlineStatus currentUser={currentUser} />
      </div>
    </div>
  );
};

export default UserProfileHeader;
