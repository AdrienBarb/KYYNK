'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils/tailwind/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';

export type Size = 's' | 'm' | 'l';

interface AvatarProps {
  pseudo?: string;
  imageId?: string | null;
  size?: Size;
}

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        s: 'h-8 w-8',
        m: 'h-16 w-16',
        l: 'h-40 w-40',
      },
    },
    defaultVariants: {
      size: 'm',
    },
  },
);

const avatarFallbackVariants = cva(
  'flex h-full w-full items-center justify-center rounded-full bg-primary text-white font-bold',
  {
    variants: {
      size: {
        s: 'text-lg',
        m: 'text-lg',
        l: 'text-3xl',
      },
    },
    defaultVariants: {
      size: 'm',
    },
  },
);

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> &
    AvatarProps &
    VariantProps<typeof avatarVariants>
>(({ className, pseudo, imageId, size, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size }), className)}
    {...props}
  >
    {imageId ? (
      <AvatarImage alt={pseudo} imageId={imageId} size={size} />
    ) : (
      <AvatarFallback pseudo={pseudo} size={size} />
    )}
  </AvatarPrimitive.Root>
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & {
    imageId: string;
    alt?: string;
    size?: Size;
  }
>(({ alt, imageId, size }) => {
  const sizeMap = {
    s: 32,
    m: 64,
    l: 160,
  };
  const dimension = sizeMap[size || 'm'];

  return (
    <Image
      src={imageId}
      alt={alt ?? 'Image'}
      width={dimension}
      height={dimension}
      quality={80}
      priority
      className="object-cover object-center"
    />
  );
});
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    pseudo?: string;
    size?: Size;
  }
>(({ className, pseudo, size, ...props }, ref) => {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(avatarFallbackVariants({ size }), className)}
      {...props}
    >
      {pseudo?.charAt(0).toUpperCase() || '?'}
    </AvatarPrimitive.Fallback>
  );
});
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export default Avatar;
