'use client';

import React, { FC, useState } from 'react';
import Image from 'next/image';
import imgixLoader from '@/lib/imgix/loader';
import { cn } from '@/utils/tailwind/cn';
import ProfilePlaceholder from './ProfilePlaceholder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface UserImageProps {
  imageId?: string | null;
  alt?: string;
  size?: number;
  quality?: number;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  className?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  fallbackPseudo?: string;
  showFallback?: boolean;
  transformations?: Record<string, any>;
  onError?: () => void;
  onLoad?: () => void;
}

const UserImage: FC<UserImageProps> = ({
  imageId,
  alt = 'User image',
  size = 160,
  quality = 80,
  priority = false,
  objectFit = 'cover',
  className,
  rounded = 'md',
  fallbackPseudo,
  showFallback = true,
  transformations = {},
  onError,
  onLoad,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const hasValidImageId = imageId && imageId.trim() !== '';

  if (!hasValidImageId || hasError) {
    if (showFallback && fallbackPseudo) {
      return (
        <div className={cn('relative', className)}>
          <ProfilePlaceholder pseudo={fallbackPseudo} />
        </div>
      );
    }
    return (
      <div
        className={cn(
          'bg-primary flex items-center justify-center',
          getRoundedClass(rounded),
          className,
        )}
        style={{ width: size, height: size }}
      >
        <FontAwesomeIcon icon={faUser} size="sm" />
      </div>
    );
  }

  const imageUrl = imgixLoader({
    src: imageId,
    width: size,
    quality,
    transformations,
  });

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        getRoundedClass(rounded),
        className,
      )}
    >
      <Image
        src={imageUrl}
        alt={alt}
        width={size}
        height={size}
        priority={priority}
        quality={quality}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          getObjectFitClass(objectFit),
        )}
        style={{ width: size, height: size }}
        onError={handleError}
        onLoad={handleLoad}
        sizes={`${size}px`}
      />
    </div>
  );
};

// Helper functions
const getRoundedClass = (rounded: string) => {
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };
  return roundedClasses[rounded as keyof typeof roundedClasses] || 'rounded-md';
};

const getObjectFitClass = (objectFit: string) => {
  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  };
  return (
    objectFitClasses[objectFit as keyof typeof objectFitClasses] ||
    'object-cover'
  );
};

export default UserImage;
