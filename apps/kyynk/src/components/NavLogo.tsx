'use client';

import { screenSizes } from '@/constants/screenSizes';
import { useMediaQuery } from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import logo from '../../public/images/logo.svg';

interface Props {}

const NavLogo: FC<Props> = ({}) => {
  const matches = useMediaQuery(`(min-width:${screenSizes.md}px)`);
  const { status } = useSession();

  if (!matches) {
    return;
  }

  return (
    <Link
      href={status === 'authenticated' ? '/dashboard/feed' : '/'}
      passHref
      prefetch
    >
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer">
        <Image
          src={logo}
          alt="Logo KYYNK"
          width={120}
          height={120}
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default NavLogo;
