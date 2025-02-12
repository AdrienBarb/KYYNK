'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import logo from '../../public/images/logo.svg';

interface Props {}

const NavLogo: FC<Props> = ({}) => {
  const { status } = useSession();

  return (
    <Link
      href={status === 'authenticated' ? '/dashboard/feed' : '/'}
      passHref
      prefetch
    >
      <div className="cursor-pointer">
        <Image
          src={logo}
          alt="Logo KYYNK"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default NavLogo;
