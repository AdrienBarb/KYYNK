'use client';

import React, { FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import useApi from '@/hooks/requests/useApi';
import Avatar from './ui/Avatar';
import OnlineStatus from '@/components/profile/OnlineStatus';
import Title from '@/components/ui/Title';
import { useUser } from '@/hooks/users/useUser';
import { FetchedUserType } from '@/types/users';
import UserProfileMenu from './UserProfileMenu';
import imgixLoader from '@/lib/imgix/loader';
import Text from './ui/Text';

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

  const imageUrl = imgixLoader({
    src: user?.profileImageId || '',
    width: 400,
    quality: 80,
  });

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col items-center text-black gap-4">
        <div className="relative aspect-square w-40 h-w-40 overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt={user?.pseudo || ''}
            layout="fill"
            objectFit="cover"
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
