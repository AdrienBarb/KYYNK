import React, { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { User } from '@prisma/client';
import Text from '@/components/Text';

interface Props {
  currentUser: User;
}

const OnlineStatus: FC<Props> = ({ currentUser }) => {
  const [onlineSlugs, setOnlineSlugs] = useState(['']);
  const t = useTranslations();

  const dateObject = currentUser?.lastLogin
    ? new Date(currentUser.lastLogin)
    : new Date();
  const timeAgoValue = formatDistanceToNow(dateObject, {
    addSuffix: true,
    locale: fr,
  });

  const isOnline = onlineSlugs?.includes(currentUser?.slug);

  return (
    <div className="font-karla mt-4 w-full text-center">
      {isOnline ? (
        <div className="flex items-center justify-center gap-1">
          <div className="w-3 flex justify-center items-center">
            <FontAwesomeIcon icon={faCircle} color="#57cc99" size="xs" />
          </div>
          <Text className="text-sm font-extralight">{t('profile.online')}</Text>
        </div>
      ) : (
        <Text className="text-sm font-extralight">{`${t(
          'profile.online',
        )} : ${timeAgoValue}`}</Text>
      )}
    </div>
  );
};

export default OnlineStatus;
