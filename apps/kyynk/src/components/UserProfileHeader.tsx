'use client';

import React, { FC } from 'react';
import { useParams } from 'next/navigation';
import useApi from '@/hooks/requests/useApi';
import OnlineStatus from '@/components/profile/OnlineStatus';
import Title from '@/components/ui/Title';
import { useUser } from '@/hooks/users/useUser';
import { FetchedUserType } from '@/types/users';
import Text from './ui/Text';
import UserImage from './UserImage';
import ProfilePlaceholder from './ProfilePlaceholder';

interface Props {
  initialUserDatas: FetchedUserType;
}

const UserProfileHeader: FC<Props> = ({ initialUserDatas }) => {
  const { slug } = useParams<{ slug: string }>();
  const { user: loggedUser } = useUser();
  const { useGet } = useApi();

  const { data: user } = useGet(
    `/api/users/${slug}`,
    {},
    {
      initialData: initialUserDatas,
      refetchOnWindowFocus: true,
      staleTime: 0,
    },
  );

  const isLoggedUserProfile = loggedUser?.slug === slug;

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col items-center text-black gap-4">
        <div className="relative aspect-square w-72 h-72 overflow-hidden rounded-md">
          <UserImage
            imageId={user?.profileImageId}
            alt={user?.pseudo}
            size={320}
          />
        </div>

        <div className="flex flex-col items-center">
          <Title Tag="h2" className="text-lg lg:text-xl" dataId="user-pseudo">
            {user?.pseudo}
          </Title>
          {!isLoggedUserProfile && <OnlineStatus currentUser={user} />}
        </div>
        <Text className="text-sm text-center max-w-lg whitespace-pre-wrap">
          {user?.description}
        </Text>
      </div>
    </div>
  );
};

export default UserProfileHeader;
