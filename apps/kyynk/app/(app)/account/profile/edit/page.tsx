import { auth } from '@/auth';
import BackButton from '@/components/Common/BackButton';
import ScrollableContainer from '@/components/ScrollableContainer';
import categoryService from '@/features/category/categoryService';
import userService from '@/features/user/userService';
import dynamic from 'next/dynamic';
import React from 'react';

const UserForm = dynamic(() => import('@/components/UserForm'), { ssr: false });

const EditProfilPage = async () => {
  const userInitialDatas = await userService.getAccountOwner();

  const session = await auth();

  return (
    <ScrollableContainer>
      <BackButton isVisible={true} prevPath={`/${session?.user?.slug}`} />
      <UserForm nextPage={`/dashboard/community/${session?.user?.id}`} />
    </ScrollableContainer>
  );
};

export default EditProfilPage;
