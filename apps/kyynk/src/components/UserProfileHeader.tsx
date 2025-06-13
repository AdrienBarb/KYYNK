'use client';

import React, { FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useApi from '@/hooks/requests/useApi';
import Avatar from './ui/Avatar';
import OnlineStatus from '@/components/profile/OnlineStatus';
import Title from '@/components/ui/Title';
import { useUser } from '@/hooks/users/useUser';
import { FetchedUserType } from '@/types/users';
import UserProfileMenu from './UserProfileMenu';

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
    <div className="flex justify-between items-center w-full">
      <div className="flex relative w-full box-border items-center text-black gap-4">
        <Avatar
          size={72}
          imageId={user?.profileImageId}
          pseudo={user?.pseudo}
        />

        <div className="flex-col gap-2">
          <Title Tag="h2" dataId="user-pseudo">
            {user.pseudo}
          </Title>
          {!isLoggedUserProfile && <OnlineStatus currentUser={user} />}
        </div>
      </div>

      <UserProfileMenu />
    </div>
  );
};

export default UserProfileHeader;
