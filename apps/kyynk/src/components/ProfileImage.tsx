'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import imgixLoader from '@/lib/imgix/loader';

interface ProfileImageProps {
  profileImageId?: string | null;
  pseudo?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
  showOverlay?: boolean;
  children?: React.ReactNode;
}

const ProfileImage: FC<ProfileImageProps> = ({
  profileImageId,
  pseudo,
  size = 160,
  className = '',
  onClick,
  showOverlay = false,
  children,
}) => {
  const hasProfileImage = profileImageId && profileImageId.trim() !== '';

  const imageUrl = hasProfileImage
    ? imgixLoader({
        src: profileImageId,
        width: size,
        quality: 80,
      })
    : '';

  const containerClasses = `relative aspect-square overflow-hidden rounded-md ${className}`;
  const containerStyle = { width: size, height: size };

  return (
    <div className={containerClasses} style={containerStyle} onClick={onClick}>
      {hasProfileImage ? (
        <Image
          src={imageUrl}
          alt={pseudo || ''}
          layout="fill"
          objectFit="cover"
        />
      ) : (
        <div className="w-full h-full bg-primary flex items-center justify-center text-white font-bold text-2xl">
          {pseudo?.charAt(0)?.toUpperCase() || 'U'}
        </div>
      )}

      {showOverlay && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
