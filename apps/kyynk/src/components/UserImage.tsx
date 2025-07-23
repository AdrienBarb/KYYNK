'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import imgixLoader from '@/lib/imgix/loader';

interface ProfileImageProps {
  imageId?: string | null;
  alt?: string;
  size?: number;
}

const UserImage: FC<ProfileImageProps> = ({ imageId, alt, size }) => {
  const hasProfileImage = imageId && imageId.trim() !== '';

  const imageUrl = hasProfileImage
    ? imgixLoader({
        src: imageId,
        width: size || 160,
        quality: 80,
      })
    : '';

  return (
    <Image src={imageUrl} alt={alt || ''} layout="fill" objectFit="cover" />
  );
};

export default UserImage;
