'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils/tailwind/cn';
import UploadcareImage from '@uploadcare/nextjs-loader';

interface AvatarProps {
  pseudo?: string;
  imageId?: string | null;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & AvatarProps
>(({ className, pseudo, imageId, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      `relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full`,
      className,
    )}
    {...props}
  >
    {imageId ? (
      <AvatarImage alt={pseudo} imageId={imageId} />
    ) : (
      <AvatarFallback pseudo={pseudo} />
    )}
  </AvatarPrimitive.Root>
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & {
    imageId: string;
    alt?: string;
  }
>(({ alt, imageId, className }) => {
  return (
    <UploadcareImage
      alt={alt || 'Profile Image'}
      src={`https://ucarecdn.com/${imageId}/`}
      fill={true}
      quality={90}
      priority
      className={cn('object-cover object-center', className)}
    />
  );
});
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    pseudo?: string;
  }
>(({ className, pseudo, ...props }, ref) => {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-primary text-white font-bold text-lg',
        className,
      )}
      {...props}
    >
      {pseudo?.charAt(0).toUpperCase() || '?'}
    </AvatarPrimitive.Fallback>
  );
});
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export default Avatar;
