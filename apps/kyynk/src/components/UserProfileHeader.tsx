'use client';

import React, { FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Conversation, User } from '@prisma/client';
import useApi from '@/hooks/requests/useApi';
import Avatar from './ui/Avatar';
import Text from '@/components/ui/Text';
import OnlineStatus from '@/components/profile/OnlineStatus';
import Title from '@/components/ui/Title';
import { Button } from './ui/Button';
import { useUser } from '@/hooks/users/useUser';
import { isUserVerified } from '@/utils/users/isUserVerified';
import { FetchedUserType } from '@/types/users';
import { getEncodedFullUrl } from '@/utils/links/getEncodedFullUrl';
import { appRouter } from '@/constants/appRouter';

interface Props {
  initialUserDatas: FetchedUserType;
}

const UserProfileHeader: FC<Props> = ({ initialUserDatas }) => {
  const { slug } = useParams<{ slug: string }>();
  const { user: loggedUser } = useUser();
  const { useGet, usePost } = useApi();
  const router = useRouter();

  const { data: user } = useGet(
    `/api/users/${slug}`,
    {},
    {
      initialData: initialUserDatas,
      refetchOnWindowFocus: true,
    },
  );

  const { mutate: createConversation, isPending } = usePost(
    `/api/conversations`,
    {
      onSuccess: (newConversation: Conversation) => {
        router.push(`/account/conversations/${newConversation.id}`);
      },
    },
  );

  const handleClickOnDiscussButton = () => {
    if (!loggedUser) {
      const encodedUrl = getEncodedFullUrl();
      router.push(`${appRouter.login}?previousUrl=${encodedUrl}`);
      return;
    }

    createConversation({ slug });
  };

  return (
    <div className="flex flex-col items-center relative w-full box-border text-black gap-4">
      <Avatar size={164} imageId={user?.profileImageId} pseudo={user?.pseudo} />
      <div className="flex flex-col items-center gap-2 w-full">
        <Title Tag="h2" dataId="user-pseudo">
          {user.pseudo}
        </Title>
        <div>
          <Text className="mt-2 text-center whitespace-pre-wrap">
            {user.description}
          </Text>
          <OnlineStatus currentUser={user} />
        </div>
      </div>
      <div className="flex gap-2">
        {loggedUser?.slug !== slug && isUserVerified({ user }) && (
          <Button
            onClick={handleClickOnDiscussButton}
            isLoading={isPending}
            disabled={isPending}
          >
            Discuss
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserProfileHeader;
